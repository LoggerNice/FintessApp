import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import dotenv from 'dotenv'
import * as fs from 'fs'

import { UserController, PostController } from './controllers/index.js'
import { postCreateValidation, regValidation} from "./validation.js"
import { checkAuth, handleErrors } from "./utils/index.js"

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
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

//Авторизация
app.post('/registration', regValidation, handleErrors, UserController.register)
app.post('/login', handleErrors, UserController.login)

//Посты
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.get('/posts', checkAuth, PostController.getAll)
app.get('/posts/:id', checkAuth, PostController.getByID)
app.patch('/posts/:id', checkAuth, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove)

const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) return console.log(err)
  console.log("Сервер запущен на порте", port)
})