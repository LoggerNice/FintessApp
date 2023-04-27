import mongoose from 'mongoose'

const MedicalFormSchema = new mongoose.Schema({
  userID: {
    type: Number,
    require: true,
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
    type: Object,
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
}, {
  timestamps: true,
})

export default mongoose.model('MedicalForm', MedicalFormSchema)