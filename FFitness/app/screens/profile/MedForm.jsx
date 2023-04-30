import {Text, TouchableOpacity, View} from "react-native"
import React, {useEffect, useState} from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import UIButton from "../../ui/UIButton"
import {useNavigation} from "@react-navigation/native";

const MedForm = () => {
  const navigation = useNavigation()
  const [form, setForm] = useState({desease: ['g','f','f'], access: false, age: 21, weight: 180, height: 70})
  const _id = AsyncStorage.getItem('_id')
  const [isForm, setIsForm] = useState(false)

  const fetchGetAPI = async () => {
    try {
      const result = await axios.get(`/medical`, _id)
      return result.data
    } catch (e) {
      console.log('Ошибка получения медицинских данных с сервера:', e)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {desease, access, age, height, weight} = await fetchGetAPI()
        if (desease) {
          setIsForm(true)
          await AsyncStorage.setItem('access', access)
          setForm({desease: desease, access: access, age: String(age), height: String(height), weight: String(weight)})
        }
      } catch (e) {
        console.log('Данные medForm не были получены', e)
      }
    }
    fetchData()
  }, [])

  const goEditMedForm = () => {
    navigation.navigate('EditMed')
  }

  return (
    <View className={'my-6 px-5 py-4 bg-white rounded-2xl space-y-3'}>
      <View className={'flex-row justify-between py-2'}>
        <Text className={'text-[22px] text-second font-bold'}>Медицинская анкета</Text>
        <TouchableOpacity onPress={goEditMedForm}>
          <Text className={'my-auto text-primary'}>Перейти -></Text>
        </TouchableOpacity>
      </View>
      {isForm ?
        <View>
          <View className={'border-primary border-t-[1px] pt-4'}>
            <Text className={'opacity-50 mb-1'}>Вас возраст</Text>
            <Text className={'font-semibold text-xl'}>{form.age}</Text>
          </View>
          <View>
            <Text className={'opacity-50 mb-1'}>Ваш рост</Text>
            <Text className={'font-semibold text-xl'}>{form.weight}</Text>
          </View>
          <View>
            <Text className={'opacity-50 mb-1'}>Ваш вес</Text>
            <Text className={'font-semibold text-xl'}>{form.height}</Text>
          </View>
          <View>
            <Text className={'opacity-50 mb-1'}>Доступ к тренировкам</Text>
            <Text className={'font-semibold text-xl'}>{form.access ? 'Разрешен' : 'Запрещен'}</Text>
          </View>
          <View>
            <Text className={'opacity-50 mb-1'}>Заболевания</Text>
            <Text className={'font-semibold text-xl'}>{form.desease.length > 1 ? 'Имеются' : 'Отсутствуют'}</Text>
          </View>
        </View>
        :
        <View>
          <UIButton title={'Заполните анкету'} onPress={goEditMedForm}/>
        </View>}
    </View>
  )
}

export default MedForm