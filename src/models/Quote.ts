import { Schema, model, models, Document } from "mongoose";

export interface IQuote extends Document {
  quotes: string[];   // now an array of words
  special: string;
  showSpecial: boolean;
}

const QuoteSchema = new Schema<IQuote>({
  quotes: { type: [] },
  special : {type: String},
  showSpecial: { type: Boolean, default: false },
},
  {
    timestamps: true,
  }
);

const Quote = models.Quote || model<IQuote>("Quote", QuoteSchema);
export default Quote;