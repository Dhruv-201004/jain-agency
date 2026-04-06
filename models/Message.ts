import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
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

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
