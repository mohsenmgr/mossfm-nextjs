import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    date: Date;
    author: string;
    content: string; // Markdown content
    photos: string[]; // URLs to uploaded photos
    slug: string;
}

const BlogPostSchema: Schema<IBlogPost> = new Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, default: Date.now },
        author: { type: String, required: true },
        content: { type: String, required: true },
        photos: [{ type: String }],
        slug: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

let BlogPost: Model<IBlogPost>;

// Avoid OverwriteModelError in dev with Next.js hot reload
try {
    BlogPost = mongoose.model<IBlogPost>('BlogPost');
} catch {
    BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
}

export default BlogPost;
