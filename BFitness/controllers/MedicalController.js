import MedicalForm from "../models/MedicalForm.js"

export const create = async (req, res) => {
  try {
    const doc = new MedicalForm({
      userID: req.body.userID,
      weight: req.body.weight,
      height: req.body.height,
      male: req.body.male,
      age: req.body.age,
      desease: req.body.desease,
      goal: req.body.goal,
      levelTrening: req.body.levelTrening,
      access: req.body.access,
    })

    const form = doc.save()
    res.json(form)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось создать мед анкету'
    })
  }
}

export const getForm = async (req, res) => {
  try {
    const form = await MedicalForm.findOne({userID: req.params.id})
    if(!form) {
      console.log('Анкета не найдена')
      return res.status(404).json({
        message: 'Анкета не найдена'
      })
    }

    res.json({
      form
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
    await MedicalForm.updateOne({userID: req.params.id}, {$set: req.body.data})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось изменить мед анкету'
    })
  }
}