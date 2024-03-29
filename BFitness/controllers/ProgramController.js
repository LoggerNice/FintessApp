import Program from "../models/Program.js"
import {createTrainingProgram} from "./GenerateProgram.js"

export const generate = async (req, res) => {
  const data = req.body.form
  const anthropometricData = {
    weight: data.weight,
    height: data.height,
    age: data.age,
    male: data.male
  }

  createTrainingProgram(data.goal, data.levelTrening, anthropometricData)
    .then(trainingProgram => {
      const newProgram = new Program({
        userID: data.userID,
        training: trainingProgram
      })

      newProgram.save()
        .then(program => {
          console.log('Программа сохранена:', program)
          res.json({program})
        })
        .catch(error => {
          console.error('Ошибка при сохранении программы:', error)
        })
    })
    .catch(err => {
      console.log('Список упражнений не сформировался.', err)
      return res.status(404).json({
        message: 'Список упражнений не сформировался'
      })
    })
}
export const create = async (req, res) => {}

export const update = async (req, res) => {
  try {
    await Program.updateOne({userID: req.params.id}, {$set: req.body.data})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось обновить данные упражнения'
    })
  }
}

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