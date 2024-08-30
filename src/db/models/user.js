import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 8, maxlength: 64, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'female',
    },
    photo: { type: String, default: '' },
    dailyNorma: { type: Number, default: 2000 },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
