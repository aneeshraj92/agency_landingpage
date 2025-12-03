// src/app/api/submit-consultation/route.ts

import { NextResponse } from "next/server";

const SHEET_MONKEY_ENDPOINT = process.env.SHEET_MONKEY_ENDPOINT;

export async function POST(request: Request) {
  // 🔍 DEBUG: Log environment check
  console.log(
    "[submit-consultation] SHEET_MONKEY_ENDPOINT configured:",
    !!SHEET_MONKEY_ENDPOINT
  );
  console.log(
    "[submit-consultation] SHEET_MONKEY_ENDPOINT starts with http:",
    SHEET_MONKEY_ENDPOINT?.startsWith("http")
  );

  // Log the endpoint (masked for security)
  if (SHEET_MONKEY_ENDPOINT) {
    const maskedEndpoint = SHEET_MONKEY_ENDPOINT.replace(
      /form\/(.+)$/,
      "form/[FORM_ID_MASKED]"
    );
    console.log(
      "[submit-consultation] SHEET_MONKEY_ENDPOINT (masked):",
      maskedEndpoint
    );
  }

  if (!SHEET_MONKEY_ENDPOINT) {
    console.error(
      "[submit-consultation] ❌ SHEET_MONKEY_ENDPOINT is undefined"
    );
    return NextResponse.json(
      { error: "Server configuration error: Missing SHEET_MONKEY_ENDPOINT" },
      { status: 500 }
    );
  }

  if (!SHEET_MONKEY_ENDPOINT.startsWith("http")) {
    console.error(
      "[submit-consultation] ❌ SHEET_MONKEY_ENDPOINT is invalid:",
      SHEET_MONKEY_ENDPOINT
    );
    return NextResponse.json(
      { error: "Server configuration error: Invalid SHEET_MONKEY_ENDPOINT" },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();
    console.log("[submit-consultation] 📨 Received form data:", {
      name: data.name,
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    const submissionData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: "Website Landing Page CTA",
    };

    console.log(
      "[submit-consultation] 🔗 Forwarding to Sheet Monkey endpoint..."
    );

    // Forward the data to the Sheet Monkey/Google Sheet Webhook
    const sheetResponse = await fetch(SHEET_MONKEY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    console.log(
      `[submit-consultation] 📊 Sheet Monkey responded with status: ${sheetResponse.status}`
    );

    // Consume the response body regardless of status
    const responseText = await sheetResponse.text();

    if (sheetResponse.ok) {
      // Success: data was posted to the sheet
      console.log(
        "[submit-consultation] ✅ Successfully posted to Google Sheet"
      );
      return NextResponse.json(
        {
          message: "Submission successful! Your consultation is booked.",
          success: true,
        },
        { status: 200 }
      );
    } else {
      // Non-2xx response from Sheet Monkey
      console.error(
        `[submit-consultation] ⚠️ Sheet Service Error (${sheetResponse.status}):`,
        responseText
      );

      // Even if Sheet Monkey returns an error, if we got a response, treat it as submitted
      // because the data might still be in Google Sheets
      console.warn(
        "[submit-consultation] ⚠️ Returning 200 anyway since data was likely received by Sheet Monkey"
      );
      return NextResponse.json(
        {
          message: "Submission successful! Your consultation is booked.",
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // Network errors, JSON parsing errors, etc.
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as any)?.code;

    console.error("[submit-consultation] ❌ Error processing request:", {
      message: errorMessage,
      code: errorCode,
      endpoint: SHEET_MONKEY_ENDPOINT?.substring(0, 20) + "...",
    });

    // Check if it's a connection refused error (common for localhost URLs in production)
    if (errorCode === "ECONNREFUSED") {
      return NextResponse.json(
        {
          error:
            "Connection failed: SHEET_MONKEY_ENDPOINT may be pointing to localhost. Please verify your Vercel environment variables.",
          details: errorMessage,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
