import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt'

import { regValidation } from './validations/auth.js'
import UserModel from './models/User.js'

dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_LINK)
        .then(() => console.log('БД подключена'))
        .catch((err) => console.log('БД не подключена. ' + err))

const app = express()
app.use(express.json())

app.post('/Registration', regValidation, async (req, res) => {
  try {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(400).json(err.array())
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      login: req.body.login,
      password: hash,
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
})

app.post('/Login', (req, res) => {

})

const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) return console.log(err)
  console.log("Сервер запущен на порте", port)
})