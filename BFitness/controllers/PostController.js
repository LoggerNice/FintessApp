import PostModel from '../models/Post.js'
import Post from "../models/Post.js"
import Exercises from "../models/Exercises.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      type: req.body.type,
      imageUrl: req.body.imageUrl,
    })

    const post = await doc.save()
    res.json({
      post
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось создать статью'
    })
  }
}

export const remove = async (req, res) => {}
export const update = async (req, res) => {}
export const getAll = async (req, res) => {
  try {
    const post = await Post.find({})
    if(!post) {
      console.log('Новости не найдены')
      return res.status(404).json({
        message: 'Новости не найдены'
      })
    }

    res.json({
      post
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить новости'
    })
  }
}
export const getByID = async (req, res) => {
  try {
    const post = await Post.findOne({_id: req.params.id})
    if(!post) {
      console.log('Информация о новости не найдена')
      return res.status(404).json({
        message: 'Информация о новости не найдена'
      })
    }

    res.json({
     post
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Не удалось получить информацию новости'
    })
  }
}