// src/app/api/submit-consultation/route.ts
// Next.js 13+ App Router API Route structure

import { NextResponse } from "next/server";

// 1. Get the Webhook URL from the environment variables
const SHEET_MONKEY_ENDPOINT = process.env.SHEET_MONKEY_ENDPOINT;

export async function POST(request: Request) {
  // Security Check 1: Ensure the webhook endpoint is configured
  if (!SHEET_MONKEY_ENDPOINT) {
    console.error("SHEET_MONKEY_ENDPOINT not configured.");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  } // Security Check 2: Only process JSON data

  if (request.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "Invalid content type." },
      { status: 400 }
    );
  }

  try {
    const data = await request.json(); // Add extra useful data before sending to the sheet

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
      // 🚨 FIX ADDED HERE:
      // Consume the response body of the external service (Sheet Monkey)
      // to prevent the serverless function from hanging or failing to close the connection properly.
      await sheetResponse.text(); // 3. Respond back to the client that the submission was successful

      return NextResponse.json(
        { message: "Submission successful, data logged to Google Sheet." },
        { status: 200 }
      );
    } else {
      // Handle potential errors from the sheet service
      const errorText = await sheetResponse.text();
      console.error("Sheet Service Error:", errorText);
      return NextResponse.json(
        { error: "Failed to log data to Google Sheet." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
