import Program from "../models/Program.js"
import {createTrainingProgram} from "./GenerateProgram.js"

export const generate = async (req, res) => {
  const data = req.body.form
  const anthropometricData = {
    weight: data.weight,
    height: data.height,
    age: data.age
  }

  createTrainingProgram(data.goal, data.levelTrening, anthropometricData)
    .then(trainingProgram => {
      const doc = new Program({
        userID: data.userID,
        training: trainingProgram
      })

      const program = doc.save()
      res.json(program)
    })
    .catch(err => {
      console.log('Список упражнений не сформировался.', err)
      return res.status(404).json({
        message: 'Список упражнений не сформировался'
      })
    })
}
export const create = async (req, res) => {}
export const update = async (req, res) => {}
export const remove = async (req, res) => {}
export const getByID = async (req, res) => {
  try {
    const program = await Program.findOne({userID: req.params.id})
    if(!program) {
      console.log('Программа тренировок не найдена')
      return res.status(404).json({
        message: 'Программа тренировок не найдена'
      })
    }

    res.json({
      program
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить программу тренировок'
    })
  }
}
export const getAll = async (req, res) => {
  try {
    const program = await Program.find({})
    if(!program) {
      console.log('Программы тренировок не найдены')
      return res.status(404).json({
        message: 'Программы тренировок не найдены'
      })
    }

    res.json({
      program
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить программы тренировок'
    })
  }
}