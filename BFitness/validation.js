import { body } from 'express-validator'

export const regValidation = [
  body('login', 'Логин должен быть более 5 символов').isLength({ min: 5 }),
  body('phone', 'Неверный формат номера телефона').isLength({ min: 11 }),
  body('password', 'Пароль должен быть более 5 символов').isLength({ min: 6 }),
  body('avatarURL', 'Введите ссылку на фото').optional().isURL(),
]

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
  body('type', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]