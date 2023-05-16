import Program from "../models/Program.js";

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
      form: program
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить программу тренировок'
    })
  }
}