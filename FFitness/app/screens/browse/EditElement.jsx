import {URLA} from "../../../axios"
import useFetch from "../../model/UseFetch"
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import UIButton from "../../ui/UIButton"
import axios from "axios"
import {Ionicons} from "@expo/vector-icons"
import UIField from "../../ui/UIField"
import UIPicker from "../../ui/UIPicker"
import {useEffect, useState} from "react"
import {useNavigation} from "@react-navigation/native"

const EditElement = ({route}) => {
  const navigation = useNavigation()
  const [element, setElement] = useState({id: 0, title: '', text: '', type: '', imageUrl: '', gif: '', difficulty: '', part: ''})
  const [isNews, setIsNews] = useState(true)

  const listType = ['Новость', 'Статья']
  const listTypeEx = ['Силовая', 'Кардио']
  const listLevel = ['Начинающий', 'Средний', 'Опытный']
  const listPart = ['Ноги', 'Пресс', 'Спина', 'Плечи', 'Грудь', 'Руки', 'Ягодицы']

  useEffect(() => {
    const fetchData = async () => {
      const {isNews, data} = route.params

      if (data.post) {
        setElement({id: data.post._id, title: data.post.title, text: data.post.text, type: data.post.type, imageUrl: data.post.imageURL})
      } else {
        setElement({id: data.exercise._id, title: data.exercise.name, text: data.exercise.description, type: data.exercise.type, imageUrl: data.exercise.photo, part: data.exercise.part, difficulty: data.exercise.difficulty, gif: data.exercise.gif})
      }

      setIsNews(isNews)
    }
    fetchData()
  }, [isNews])

  const editHandler = async () => {
    const data = {
      name: element.title,
      photo: element.imageUrl,
      description: element.text,
      gif: element.gif,
      difficulty: element.difficulty,
      type: element.type,
      part: element.part
    }

    const res = isNews ? await axios.patch(`${URLA}/posts/${element.id}`, {data: element}) : await axios.patch(`${URLA}/exercises/${element.id}`, {data})
    navigation.navigate(isNews ? 'PostsFull' : 'Browse')
    console.log(res)
  }

  const getIndex = () => {
    return isNews ? listType.indexOf(element.type) : listTypeEx.indexOf(element.type)
  }
  const getIndexLevel = () => {
    return listLevel.indexOf(element.difficulty)
  }
  const getIndexPart = () => {
    return listPart.indexOf(element.part)
  }


  return (
    <View className={'mx-4 mt-5'}>
      <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center mb-5'}>
        <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
        <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'h-full mb-24'}>
          <Text className="font-bold text-4xl mb-6 text-white text-center">Редактирование {isNews ? '\nновости' : 'упражнения'}</Text>
          <View className={'mb-4'}>
            <UIField placeholder={'Заголовок'} value={element.title} onChange={value => setElement({...element, title: value})}/>
            <UIField placeholder={'Описание'} value={element.text} onChange={value => setElement({...element, text: value})}/>
            <UIPicker options={isNews ? listType : listTypeEx} index={getIndex()} title={isNews ? 'Тип новости' : 'Тип упражнения'} onChange={value => setElement({...element, type: value})}/>
            <UIField placeholder={'Ссылка на фото'} value={element.imageUrl} onChange={value => setElement({...element, imageUrl: value})}/>
            {!isNews &&
              <View>
                <UIField placeholder={'Ссылка на gif'} value={element.gif} onChange={value => setElement({...element, gif: value})}/>
                <UIPicker options={listLevel} index={getIndexLevel()} title={'Сложность'} onChange={value => setElement({...element, difficulty: value})}/>
                <UIPicker options={listPart} index={getIndexPart()} title={'Часть тела'} onChange={value => setElement({...element, part: value})}/>
              </View>
            }
          </View>
          <UIButton title={'Изменить'} onPress={editHandler}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default EditElement