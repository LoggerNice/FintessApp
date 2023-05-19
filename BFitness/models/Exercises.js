import mongoose from 'mongoose';

const ExercisesSchema = new mongoose.Schema(
  {
    part: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      default: 'Начинающий',
    },
    gif: String,
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: String
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Exercises', ExercisesSchema);