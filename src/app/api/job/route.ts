import connectToDB from '@/lib/mongoose';

// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/Job";

export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectToDB();

    // Fetch all jobs from the database
    const jobs = await Job.find({}).sort({ dateStart: -1 });

    // Return JSON response
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
};