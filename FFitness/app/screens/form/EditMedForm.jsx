import {View, Text, ScrollView} from "react-native";
import axios from "axios";
import UIHeader from "../../ui/UIHeader";
import React, {useEffect, useState} from "react";
import UIField from "../../ui/UIField";
import UIButton from "../../ui/UIButton";
import UIPicker from "../../ui/UIPicker";
import UIAddList from "../../ui/UIAddList";
import UIPickerImage from "../../ui/UIPickerImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {URLA} from "../../../axios";
import {useNavigation} from "@react-navigation/native";
import useMedForm from "../../model/MedForm";
import {getFormStorage} from "../../model/Storage";

const EditMedForm = () => {
  const navigation = useNavigation()
  const {form, isLoadingForm} = useMedForm()
  const [medForm, setMedForm] = useState({userID: '', token: '', weight: 0, height: 0, age: 0, desease: [], sertificate: '', goal: '', levelTrening: '', access: false})
  const fields = {
    token: medForm.token,
    userID: medForm.userID,
    weight: medForm.weight,
    height: medForm.height,
    age: medForm.age,
    desease: medForm.desease,
    sertificate: medForm.sertificate,
    goal: medForm.goal,
    levelTrening: medForm.levelTrening,
    access: medForm.access
  }

  const listLevel = ['Начинающий', 'Средний', 'Опытный']
  const listGoal = ['Поддержание формы', 'Похудение', 'Набор массы']

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem('_id')
      const token = await AsyncStorage.getItem('token')
      const {goal, levelTrening} = await getFormStorage()
      setMedForm({userID: id, token: token, weight: form.weight, age: form.age, height: form.height, access: form.access, goal: goal, desease: form.desease, levelTrening: levelTrening, sertificate: form.sertificate})
    }

    fetchData()
  }, [])

  const fetchPatchAPI = async () => {
    try {
      if(isLoadingForm) {
        await axios.patch(`${URLA}/medical`, fields)
      } else {
        await axios.post(`${URLA}/medical`, fields)
      }
    } catch (e) {
      console.log('Ошибка изменения медицинских данных:', e)
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
          <UIField placeholder={'Ваш возраст'} value={medForm.age.toString()} onChange={value => setMedForm({...medForm, age: value})}/>
          <UIField placeholder={'Ваш вес'} value={medForm.weight.toString()} onChange={value => setMedForm({...medForm, weight: value})}/>
          <UIField placeholder={'Ваш рост'} value={medForm.height.toString()} onChange={value => setMedForm({...medForm, height: value})}/>
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