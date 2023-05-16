import {View, ScrollView} from "react-native"
import axios from "axios"
import UIHeader from "../../ui/UIHeader"
import React, {useState} from "react"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"
import UIPicker from "../../ui/UIPicker"
import UIAddList from "../../ui/UIAddList"
import UIPickerImage from "../../ui/UIPickerImage"
import {URLA} from "../../../axios"
import {useNavigation} from "@react-navigation/native"
import useFetch from "../../model/UseFetch"

const EditMedForm = ({route}) => {
  const navigation = useNavigation()
  const {userID} = route.params
  const url = `${URLA}/medical/${userID}`
  const {data, isLoading} = useFetch(url)
  console.log(data)
  const [medForm, setMedForm] = useState({
    userID: userID || 0,
    weight: data.weight || 0,
    age: data.age || 0,
    height: data.height || 0,
    access: data.access || false,
    goal: data.goal || '',
    desease: data.desease || [],
    levelTrening: data.levelTrening || '',
    sertificate: data.sertificate || ''
  })

  const listLevel = ['Начинающий', 'Средний', 'Опытный']
  const listGoal = ['Поддержание формы', 'Похудение', 'Набор массы']

  const fetchPatchAPI = async () => {
    try {
      if(isLoading) {
        await axios.patch(`${URLA}/medical`, medForm)
      } else {
        await axios.post(`${URLA}/medical`, medForm)
      }
    } catch (e) {
      console.log('Ошибка сохранения медицинских данных.', e)
    }
  }

  const regHandler = async () => {
    await fetchPatchAPI()
    navigation.navigate('Profile')
  }

  return (
    <ScrollView>
      <View className={'mt-5 mx-4 mb-10'}>
        <UIHeader/>

        <View className={'mt-6 mb-5'}>
          <UIField placeholder={'Ваш возраст'} value={medForm.age} onChange={value => setMedForm({...medForm, age: value})}/>
          <UIField placeholder={'Ваш вес'} value={medForm.weight} onChange={value => setMedForm({...medForm, weight: value})}/>
          <UIField placeholder={'Ваш рост'} value={medForm.height} onChange={value => setMedForm({...medForm, height: value})}/>
          <UIPickerImage onChange={value => setMedForm({...medForm, sertificate: value})}/>
          <UIPicker options={listGoal} index={listGoal.indexOf(medForm.goal)} title={'Цель занятия тренировками'} onChange={value => setMedForm({...medForm, goal: value})}/>
          <UIPicker options={listLevel} index={listLevel.indexOf(medForm.levelTrening)} title={'Сложность тренировок'} onChange={value => setMedForm({...medForm, levelTrening: value})}/>
          <UIAddList onChange={value => setMedForm({...medForm, desease: value})}/>
        </View>

        <UIButton title={'Сохранить анкету'} onPress={regHandler}/>
      </View>
    </ScrollView>
  )
}

export default EditMedForm