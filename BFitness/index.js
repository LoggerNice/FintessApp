import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import dotenv from 'dotenv'
import * as fs from 'fs'

import {UserController, PostController, MedicalController, ProgramController} from "./controllers/index.js"

dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_LINK)
        .then(() => console.log('БД подключена'))
        .catch((err) => console.log('БД не подключена. ' + err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

//Получение фото
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

//Авторизация
app.post('/registration', UserController.register)
app.post('/login', UserController.login)

//Личный кабинет
app.get('/profile/:id', UserController.getInfoByID)
app.patch('/profile', UserController.update)
app.get('/users', UserController.getAll)

//Мед анкета
app.get('/medical/:id', MedicalController.getForm)
app.post('/medical', MedicalController.create)
app.patch('/medical', MedicalController.update)
//Программа тренировок

app.get('/program/:id', ProgramController.getByID)
app.post('/program', ProgramController.create)
app.patch('/program', ProgramController.update)

//Посты
app.post('/posts', PostController.create)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getByID)
app.patch('/posts/:id', PostController.update)
app.delete('/posts/:id', PostController.remove)

const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) return console.log(err)
  console.log("Сервер запущен на порте", port)
})