// src/app/api/submit-consultation/route.ts
import { NextResponse } from 'next/server';

const SHEET_MONKEY_ENDPOINT = process.env.SHEET_MONKEY_ENDPOINT;

export async function POST(request: Request) {
  if (!SHEET_MONKEY_ENDPOINT) {
    return NextResponse.json({ error: 'Server configuration error: Webhook not set.' }, { status: 500 });
  }

  try {
    const data = await request.json();

    const submissionData = {
        ...data,
        timestamp: new Date().toISOString(),
        source: 'Website Landing Page Consultation Form',
    };

    // Forward the data to the Google Sheet service (e.g., Sheet Monkey)
    const sheetResponse = await fetch(SHEET_MONKEY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (sheetResponse.ok) {
      return NextResponse.json({ message: 'Submission successful.' }, { status: 200 });
    } else {
      console.error('Sheet Service Error:', await sheetResponse.text());
      return NextResponse.json({ error: 'Failed to log data to Google Sheet.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}