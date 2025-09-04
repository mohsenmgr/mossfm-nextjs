// models/Job.ts
import { Schema, model, models, Document } from "mongoose";

// TypeScript interface for type safety
export interface IJob extends Document {
  title: string;
  location: string;
  dateStart: string;
  dateFinish: string;
  jobDescription: string;
  responsibilities: {
    title: string;
    items: string[];
  };
  skills?: string[];
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: [true, "Job title is required"] },
  location: { type: String, required: [true, "Job location is required"] },
  dateStart: { type: String, required: [true, "Start date is required"] },
  dateFinish: { type: String, required: [true, "Finish date is required"] },
  jobDescription: { type: String, required: [true, "Job description is required"] },
  responsibilities: {
    title: { type: String, required: [true, "Responsibilities title is required"] },
    items: { type: [String], required: [true, "Responsibilities items are required"] },
  },
  skills: { type: [String], default: [] },
}, { timestamps: true });

const Job = models.Job || model<IJob>("Job", JobSchema);

export default Job;