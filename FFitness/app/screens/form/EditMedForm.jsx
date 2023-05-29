import {View, ScrollView} from "react-native"
import axios from "axios"
import UIHeader from "../../ui/UIHeader"
import React, {useState} from "react"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"
import UIPicker from "../../ui/UIPicker"
import UIAddList from "../../ui/UIAddList"
import {URLA} from "../../../axios"
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditMedForm = ({route}) => {
  const navigation = useNavigation()
  const {form, userID, role} = route.params
  const [medForm, setMedForm] = useState({userID: userID || 0, role: role || '', weight:form.weight || 0, age:form.age || 0, height:form.height || 0, access:form.access || false, goal:form.goal || '', desease:form.desease || [], levelTrening:form.levelTrening || ''})

  const listLevel = ['Начинающий', 'Средний', 'Опытный']
  const listGoal = ['Поддержание формы', 'Похудение', 'Набор массы']

  const fetchPatchAPI = async () => {
    try {
      if(form) {
        await axios.patch(`${URLA}/medical`, medForm)
      } else {
        await axios.post(`${URLA}/medical`, medForm)
      }
    } catch (e) {
      console.log('Ошибка сохранения медицинских данных.', e)
    }
  }

  const grantAccess = async () => {
    const data = {access: true}
    await axios.patch(`${URLA}/medical/${userID}`, {data})
  }

  const regHandler = async () => {
    await fetchPatchAPI()
    navigation.navigate(() => navigation.goBack())
  }

  return (
    <ScrollView>
      <View className={'mt-5 mx-4 mb-10'}>
        <UIHeader/>

        <View className={'mt-6 mb-5'}>
          <UIField placeholder={'Ваш возраст'} value={medForm.age.toString()} onChange={value => setMedForm({...medForm, age: value})}/>
          <UIField placeholder={'Ваш вес'} value={medForm.weight.toString()} onChange={value => setMedForm({...medForm, weight: value})}/>
          <UIField placeholder={'Ваш рост'} value={medForm.height.toString()} onChange={value => setMedForm({...medForm, height: value})}/>
          <UIPicker options={listGoal} index={listGoal.indexOf(medForm.goal)} title={'Цель занятия тренировками'} onChange={value => setMedForm({...medForm, goal: value})}/>
          <UIPicker options={listLevel} index={listLevel.indexOf(medForm.levelTrening)} title={'Сложность тренировок'} onChange={value => setMedForm({...medForm, levelTrening: value})}/>
          <UIAddList onChange={value => setMedForm({...medForm, desease: value})}/>
        </View>

        {medForm.role ?
          medForm.role === 'medic' && <UIButton title={'Предоставить доступ'} onPress={grantAccess}/>
          :
          <UIButton title={'Сохранить анкету'} onPress={regHandler}/>
        }
      </View>
    </ScrollView>
  )
}

export default EditMedForm