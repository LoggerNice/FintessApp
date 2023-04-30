import MedicalForm from "../models/MedicalForm.js";

export const get = async (req, res) => {
  try {
    const form = await MedicalForm.findOne({userID: req.body._id})
    if(!form) {
      console.log('Анкета не найдена')
      return res.status(404).json({
        message: 'Анкета не найдена'
      })
    }

    res.json({
      form,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить данные мед анкеты'
    })
  }
}

export const update = async (req, res) => {
  try {

  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось изменить мед анкету'
    })
  }
}