import mongoose from 'mongoose'

const ProgramSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  training: {
    type: Array,
    require: true
  }
}, {
  timestamps: true,
})

export default mongoose.model('Program', ProgramSchema)