import bcrypt from "bcrypt"
import UserModel from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const passwordUser = req.body.pass
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(passwordUser, salt)

    const doc = new UserModel({
      login: req.body.login,
      password: hash,
      name: req.body.name,
      avatarURL: req.body.avatarURL || 'https://www.pinclipart.com/picdir/big/165-1653686_female-user-icon-png-download-user-colorful-icon.png',
      role: 'user',
      experience: 100,
      acceptInstruction: false,
    })
    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      '8eb1b4c47b076bd789291a230ad09d0d',
      {
        expiresIn: '30d',
    })

    const { password, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({login: req.body.login})
    if(!user) {
      console.log('Пользователь не существует')
      return res.status(404).json({
        message: 'Пользователь не существует'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.pass, user._doc.password)
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль'
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      '8eb1b4c47b076bd789291a230ad09d0d',
      {
        expiresIn: '30d',
      }
    )

    const { password, ...userData } = user._doc

    res.json({
      ...userData,
      token
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось авторизоваться'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find({role: 'user'})

    if (!users) {
      return res.status(404).json({
        message: 'Пользователи не найдены',
      })
    }

    const data = users.map(user => {
      const { password, ...userData } = user._doc
      return userData
    })

    res.json({data})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить данные профиля'
    })
  }
}

export const getInfoByID = async (req, res) => {
  try {
    const user = await UserModel.findOne({_id: req.params.id});

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { password, ...userData } = user._doc;

    res.json(userData);
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить данные профиля'
    })
  }
}

export const update = async (req, res) => {
  try {
    await UserModel.updateOne({_id: req.params.id}, {$set: req.body.data})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось изменить данные профиля'
    })
  }
}
