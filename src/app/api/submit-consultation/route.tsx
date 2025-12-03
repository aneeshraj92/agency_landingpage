// src/app/api/submit-consultation/route.ts

import { NextResponse } from "next/server";

const SHEET_MONKEY_ENDPOINT = process.env.SHEET_MONKEY_ENDPOINT;

export async function POST(request: Request) {
  if (!SHEET_MONKEY_ENDPOINT || !SHEET_MONKEY_ENDPOINT.startsWith("http")) {
    console.error("SHEET_MONKEY_ENDPOINT not configured or invalid.");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();

    const submissionData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: "Website Landing Page CTA",
    };

    // Forward the data to the Sheet Monkey/Google Sheet Webhook
    const sheetResponse = await fetch(SHEET_MONKEY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    // Consume the response body regardless of status
    const responseText = await sheetResponse.text();

    if (sheetResponse.ok) {
      // Success: data was posted to the sheet
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
        `Sheet Service Error (${sheetResponse.status}):`,
        responseText
      );
      return NextResponse.json(
        { error: "Failed to log data to Google Sheet.", details: responseText },
        { status: 500 }
      );
    }
  } catch (error) {
    // Network errors, JSON parsing errors, etc.
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
