import Exercises from "../models/Exercises.js"
import UserModel from "../models/User.js";

export const getByID = async (req, res) => {
  try {
    const exercise = await Exercises.findOne({_id: req.params.id})
    if(!exercise) {
      console.log('Информация об упражнении не найдена')
      return res.status(404).json({
        message: 'Информация об упражнении не найдена'
      })
    }

    res.json({
      exercise
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить информацию об упражнении'
    })
  }
}
export const getAll = async (req, res) => {
  try {
    const exercise = await Exercises.find({})
    if(!exercise) {
      console.log('Упражнения не найдены')
      return res.status(404).json({
        message: 'Упражнения не найдены'
      })
    }

    res.json({
      exercise
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить упражнения'
    })
  }
}

export const create = async (req, res) => {
  try {
    console.log(req.body)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось добавить упражнение'
    })
  }
}

export const update = async (req, res) => {
  try {
    await Exercises.updateOne({_id: req.params.id}, {$set: req.body.data})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось обновить данные упражнения'
    })
  }
}