export const get = async (req, res) => {
  try {

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