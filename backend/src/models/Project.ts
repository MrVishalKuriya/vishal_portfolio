import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  createdAt: Date;
}

const projectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    githubUrl: { type: String },
    demoUrl: { type: String },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
