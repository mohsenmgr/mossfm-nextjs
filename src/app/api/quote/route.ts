import connectToDB from '@/lib/mongoose';

// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import Quote from "@/models/Quote";

export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectToDB();

    // Fetch all jobs from the database
    const quote = await Quote.findOne({});

    // Return JSON response
    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
};