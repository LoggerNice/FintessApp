import PostModel from '../models/Post.js'

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      type: req.body.type,
      imageUrl: req.body.imageUrl,
    })
    const post = await doc.save()
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось создать статью'
    })
  }
}

export const remove = async (req, res) => {}
export const update = async (req, res) => {}
export const getAll = async (req, res) => {}
export const getByID = async (req, res) => {}