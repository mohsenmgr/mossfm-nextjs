// models/Contact.ts
import { Schema, model, models, Document } from "mongoose";

// TypeScript interface for type safety
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
}, {
  timestamps: true, 
});

const Contact = models.Contact || model<IContact>("Contact", ContactSchema);

export default Contact;