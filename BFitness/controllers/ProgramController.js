import Program from "../models/Program.js"
import Exercises from "../models/Exercises.js";

const searchInObject = (object, formData) => {
  let result = null

  for (const level in object) {
    if (level === formData) {
      result = object[level]
      break
    }
  }

  return result
}

export const create = async (req, res) => {
  const {form} = req.body

  const levels = {'Начинающий': 5, 'Средний': 7, 'Опытный': 9}
  const goalTypes = {
    'Поддержание формы': ['Силовая', 'Кардио'],
    'Похудение': ['Кардио'],
    'Набор массы': ['Силовая']
  }

  const numberOfExercises = searchInObject(levels, form.levelTrening)
  const exerciseTypes = searchInObject(goalTypes, form.goal)

  Exercises.find({type: { $in: exerciseTypes }, difficulty: form.levelTrening}).limit(numberOfExercises).exec((err, exercises) => {
    if (err) throw err;
    console.log(exercises);
  });
}
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