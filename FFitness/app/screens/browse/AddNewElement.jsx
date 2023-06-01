import {KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View} from "react-native"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"
import {useEffect, useState} from "react"
import UIPicker from "../../ui/UIPicker"
import axios from "axios"
import {URLA} from "../../../axios"
import {Ionicons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"

const AddNewElement = ({ route }) => {
  const navigation = useNavigation()
  const [element, setElement] = useState({title: '', text: '', type: '', url: '', gif: '', difficulty: '', part: ''})
  const [isNews, setIsNews] = useState(true)

  const listType = ['Новость', 'Статья']
  const listTypeEx = ['Силовая', 'Кардио']
  const listLevel = ['Начинающий', 'Средний', 'Опытный']
  const listPart = ['Ноги', 'Пресс', 'Спина', 'Плечи', 'Грудь', 'Руки', 'Ягодицы']

  useEffect(() => {
    const fetchData = async () => {
      const {isNews} = route.params
      setIsNews(isNews)
    }
    fetchData()
  }, [isNews])

  const addHandler = async () => {
    const res = isNews ? await axios.post( `${URLA}/posts`, element) : await axios.post( `${URLA}/exercises`, element)
    console.log(res)
  }

  return (
    <KeyboardAvoidingView className={'mx-4 mt-5'} behavior="padding" enabled>
      <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center mb-5'}>
        <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
        <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'h-full mb-24'}>
          <Text className="font-bold text-4xl mb-6 text-white text-center">Добавление {isNews ? '\nновости' : 'упражнения'}</Text>
          <View className={'mb-4'}>
            <UIField placeholder={'Заголовок'} value={element.title} onChange={value => setElement({...element, title: value})}/>
            <UIField placeholder={'Описание'} value={element.text} onChange={value => setElement({...element, text: value})}/>
            <UIPicker options={isNews ? listType : listTypeEx} title={isNews ? 'Тип новости' : 'Тип упражнения'} onChange={value => setElement({...element, type: value})}/>
            <UIField placeholder={'Ссылка на фото'} value={element.url} onChange={value => setElement({...element, imageUrl: value})}/>
            {!isNews &&
              <View>
                <UIField placeholder={'Ссылка на gif'} value={element.gif} onChange={value => setElement({...element, gif: value})}/>
                <UIPicker options={listLevel} title={'Сложность'} onChange={value => setElement({...element, difficulty: value})}/>
                <UIPicker options={listPart} title={'Часть тела'} onChange={value => setElement({...element, part: value})}/>
              </View>
            }
          </View>
          <UIButton title={'Добавить'} onPress={addHandler}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddNewElement