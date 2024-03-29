import {View, ScrollView, Text, TouchableOpacity} from "react-native"
import axios from "axios"
import UIHeader from "../../ui/UIHeader"
import React, {useState} from "react"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"
import UIPicker from "../../ui/UIPicker"
import UIAddList from "../../ui/UIAddList"
import {URLA} from "../../../axios"
import {useNavigation} from "@react-navigation/native"
import {Ionicons} from "@expo/vector-icons";

const EditMedForm = ({route}) => {
  const navigation = useNavigation()
  const listLevel = ['Начинающий', 'Средний', 'Опытный']
  const listGoal = ['Поддержание формы', 'Похудение', 'Набор массы']
  const listMale = ['Мужской', 'Женский']

  const {form, userID, role} = route.params
  const [medForm, setMedForm] = useState({userID: userID || 0, role: role || '', male:form?.male || listMale[0], weight:form?.weight, age:form?.age, height:form?.height, access:form?.access || false, goal:form?.goal, desease:form?.desease || [], levelTrening:form?.levelTrening || listLevel[0]})

  const fetchPatchAPI = async () => {
    try {
      if(form) {
        await axios.patch(`${URLA}/medical/${userID}`, {data: medForm})
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
    navigation.navigate('Profile')
  }

  return (
    <ScrollView>
      <View className={'mt-5 mx-4 mb-10'}>
        <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center'}>
          <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
        </TouchableOpacity>

        <View className={'mt-6 mb-5'}>
          <UIField placeholder={'Ваш возраст'} value={medForm.age?.toString()} onChange={value => setMedForm({...medForm, age: value})}/>
          <UIField placeholder={'Ваш вес'} value={medForm.weight?.toString()} onChange={value => setMedForm({...medForm, weight: value})}/>
          <UIField placeholder={'Ваш рост'} value={medForm.height?.toString()} onChange={value => setMedForm({...medForm, height: value})}/>
          <UIPicker options={listMale} index={listMale.indexOf(medForm.male)} title={'Ваш пол'} onChange={value => setMedForm({...medForm, male: value})}/>
          <UIPicker options={listGoal} index={listGoal.indexOf(medForm.goal)} title={'Цель занятия тренировками'} onChange={value => setMedForm({...medForm, goal: value})}/>
          <UIPicker options={listLevel} index={listLevel.indexOf(medForm.levelTrening)} title={'Сложность тренировок'} onChange={value => setMedForm({...medForm, levelTrening: value})}/>
          <UIAddList value={medForm.desease} onChange={value => setMedForm({...medForm, desease: value})}/>
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