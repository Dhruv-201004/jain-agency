import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IRecruitmentApplication extends Document {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: number;
  portfolioUrl?: string;
  message: string;
  createdAt: Date;
}

const RecruitmentApplicationSchema = new Schema<IRecruitmentApplication>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const RecruitmentApplication: Model<IRecruitmentApplication> =
  mongoose.models.RecruitmentApplication ||
  mongoose.model<IRecruitmentApplication>(
    "RecruitmentApplication",
    RecruitmentApplicationSchema,
  );
