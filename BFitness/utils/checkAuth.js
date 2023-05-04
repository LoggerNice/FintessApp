import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.body.token)

  if (token) {
    try {
      const decoded = jwt.verify(token, '8eb1b4c47b076bd789291a230ad09d0d')

      req.userId = decoded._id
      next()
    } catch (e) {
      console.log('Нет доступа')
      return res.status(403).json({
        message: 'Нет доступа',
      })
    }
  } else {
    console.log('Нет доступа')
    return res.status(403).json({
      message: 'Нет доступа',
    })
  }
}