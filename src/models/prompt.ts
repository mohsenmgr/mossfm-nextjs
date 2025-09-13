// models/prompt.ts
import { Document, Model, Schema, model, models } from 'mongoose';

export interface IPrompt extends Document {
    creator: Schema.Types.ObjectId; // reference to User
    prompt: string;
    tag: string;
}

const PromptSchema = new Schema<IPrompt>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
});

// Add generic so TS knows model shape
const Prompt: Model<IPrompt> = (models.Prompt as Model<IPrompt>) || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
