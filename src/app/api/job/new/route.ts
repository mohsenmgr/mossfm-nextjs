import connectToDB from '@/lib/mongoose';

// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/Job";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectToDB();

  
    // Return JSON response
    return NextResponse.json("", { status: 200 });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
};