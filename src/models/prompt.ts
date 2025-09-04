import { Schema,model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, // creator is a document in the database
        ref: 'User'   // one to many relationship, a user can create many prompts
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;