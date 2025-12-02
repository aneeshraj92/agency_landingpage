// src/app/api/submit-consultation/route.ts

import { NextResponse } from "next/server";

const SHEET_MONKEY_ENDPOINT = process.env.SHEET_MONKEY_ENDPOINT;

export async function POST(request: Request) {
  if (!SHEET_MONKEY_ENDPOINT || !SHEET_MONKEY_ENDPOINT.startsWith("http")) {
    console.error("SHEET_MONKEY_ENDPOINT not configured or invalid.");
    return new Response(
      JSON.stringify({ error: "Server configuration error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const data = await request.json();

    const submissionData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: "Website Landing Page CTA",
    }; // 2. Forward the data to the Sheet Monkey/Google Sheet Webhook

    const sheetResponse = await fetch(SHEET_MONKEY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (sheetResponse.ok) {
      // 🚨 CRITICAL FIX: Consume the response body of the external service.
      await sheetResponse.text(); // 3. Use standard Response object for robustness.

      return new Response(
        JSON.stringify({
          message: "Submission successful! Your consultation is booked.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Handle non-successful status from webhook
      const errorText = await sheetResponse.text();
      console.error("Sheet Service Error (Non-200):", errorText);
      return NextResponse.json(
        { error: "Failed to log data to Google Sheet." },
        { status: 500 }
      );
    }
  } catch (error) {
    // This catches connection errors, network failures, or JSON parsing issues.
    console.error("Error processing request/Network failure:", error); // Use new Response for consistency
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
