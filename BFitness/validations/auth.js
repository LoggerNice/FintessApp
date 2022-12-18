import { body } from 'express-validator'

export const regValidation = [
  body('login', 'Логин должен быть более 3 символов').isLength({ min: 4 }),
  body('password', 'Логин должен быть более 5 символов').isLength({ min: 6 }),
]