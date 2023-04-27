import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  avatarURL: String,
  role: String,
  experience: Number,
  }, {
  timestamps: true,
})

export default mongoose.model('User', UserSchema)