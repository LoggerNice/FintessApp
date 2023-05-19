import Exercises from "../models/Exercises.js"

export const getByID = async (req, res) => {
  try {
    const data = await Exercises.findOne({_id: req.params.id})
    if(!data) {
      console.log('Информация об упражнении не найдена')
      return res.status(404).json({
        message: 'Информация об упражнении не найдена'
      })
    }

    res.json({
      data
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
    const data = await Exercises.find()
    if(!data) {
      console.log('Упражнения не найдены')
      return res.status(404).json({
        message: 'Упражнения не найдены'
      })
    }

    res.json({
      data
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить упражнения'
    })
  }
}