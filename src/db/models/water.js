import { model, Schema, Types } from 'mongoose';

const watersSchema = new Schema(
  {
    date: { type: Date, required: false },
    volume: { type: Number, required: true },
    userId: { type: Types.ObjectId, ref: 'users', required: false },
  },
  { timestamps: true, versionKey: false },
);

export const WatersCollection = model('waters', watersSchema);
