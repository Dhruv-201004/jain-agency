import { PROJECT_CATEGORIES } from "@/lib/constants";
import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  category: (typeof PROJECT_CATEGORIES)[number];
  slug: string;
  websiteUrl: string;
  featured: boolean;
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
    slug: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },
    websiteUrl: {
      type: String,
      default: "",
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
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
