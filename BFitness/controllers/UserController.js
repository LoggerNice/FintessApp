import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      login: req.body.login,
      phone: req.body.phone,
      password: hash,
      name: req.body.name,
      avatarURL: req.body.avatarURL,
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

    const { passwordHash, ...userData } = user._doc

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
      return res.status(404).json({
        message: 'Пользователь не существует'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password)
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

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось авторизоваться'
    })
  }
}