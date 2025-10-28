import { Document, Schema, model, models } from 'mongoose';

// TypeScript interface for type safety
export interface IWord {
    value: string;
    highlight: boolean;
}

export interface IAbout extends Document {
    text: IWord[]; // now an array of words
    skills: string[];
    photoUrl: string;
}

const WordSchema = new Schema<IWord>({
    value: { type: String, required: true },
    highlight: { type: Boolean, default: false }
});

const AboutSchema = new Schema<IAbout>(
    {
        text: {
            type: [WordSchema], // array of word objects
            required: true
        },
        skills: {
            type: [String],
            default: []
        },
        photoUrl: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const About = models.About || model<IAbout>('About', AboutSchema);

export default About;
