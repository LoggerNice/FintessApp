import {View, Text, ScrollView} from "react-native";
import axios from "axios";
import UIHeader from "../../ui/UIHeader";
import React, {useState} from "react";
import UIField from "../../ui/UIField";
import UIButton from "../../ui/UIButton";
import UIPicker from "../../ui/UIPicker";
import UIAddList from "../../ui/UIAddList";
import UIPickerImage from "../../ui/UIPickerImage";

const EditMedForm = () => {
  const [form, setForm] = useState({userID: 0, weight: 0, height: 0, age: 0, desease: [], sertificate: '', goal: '', levelTrening: '', access: false})
  const listGoal = ['Поддержание формы', 'Похудение', 'Набор массы']
  const listLevel = ['Лёгкий', 'Средний', 'Сложный']
  const {userID, weight, height, age, desease, sertificate, goal, levelTrening, access} = form
  const fields = {userID, weight, height, age, desease, sertificate, goal, levelTrening, access}

  const fetchPatchAPI = async () => {
    try {
      return await axios.patch(`/medical`, fields)
    } catch (e) {
      console.log('Ошибка отправки данных на сервер:', e)
    }
  }

  const regHandler = async () => {

  }

  return (
    <ScrollView>
      <View className={'my-5 mx-4'}>
        <UIHeader/>

        <View className={'mt-6 mb-5'}>
          <UIField placeholder={'Ваш возраст'} value={form.age} onChange={value => setForm({...form, age: value})}/>
          <UIField placeholder={'Ваш вес'} value={form.weight} onChange={value => setForm({...form, weight: value})}/>
          <UIField placeholder={'Ваш рост'} value={form.height} onChange={value => setForm({...form, height: value})}/>
          <UIPickerImage onChange={value => setForm({...form, sertificate: value})}/>
          <UIPicker options={listGoal} title={'Цель занятия тренировками'}/>
          <UIPicker options={listLevel} title={'Сложность тренировок'}/>
          <UIAddList/>
        </View>

        <UIButton title={'Сохранить анкету'} onPress={regHandler}/>
      </View>
    </ScrollView>
  )
}

export default EditMedForm