import mongoose from 'mongoose'

const MedicalFormSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  weight: {
    type: Number,
    require: true,
  },
  height: {
    type: Number,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  desease: {
    type: Array,
  },
  sertificate: {
    type: String,
    require: true,
  },
  goal: {
    type: String,
  },
  levelTrening: {
    type: String,
  },
  access: {
    type: Boolean,
    require: true
  },
}, {
  timestamps: true,
})

export default mongoose.model('MedicalForm', MedicalFormSchema)