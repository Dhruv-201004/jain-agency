import { PROJECT_CATEGORIES } from "@/lib/constants";
import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  category: (typeof PROJECT_CATEGORIES)[number];
  websiteUrl: string;
  images: string[];
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: PROJECT_CATEGORIES,
    },
    websiteUrl: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
