import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: 'Статья',
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);