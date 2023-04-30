import React, {useState} from 'react'
import {Alert, Text, View} from "react-native"
import axios from "axios";

import UIButton from "../../ui/UIButton"
import UIField from "../../ui/UIField"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ navigation }) => {
  const [data, setData] = useState({login: '89173085293', pass: 'vadim2323'})
  const {login, pass} = data
  const fields = {
    login,
    pass,
  }

  const fetchAPI = async () => {
    try {
      return await axios.post(`/login`, fields)
    } catch (e) {
      console.log('Ошибка отправки данных на сервер:', e)
    }
  }

  const loginHandler = async () => {
    const result = await fetchAPI()
    if (result) {
      await AsyncStorage.setItem('token', result.data.token)
      await AsyncStorage.setItem('_id', result.data._id)
      await AsyncStorage.setItem('role', result.data.role)
      await AsyncStorage.setItem('name', result.data.name)
      await AsyncStorage.setItem('photo', result.data.avatarURL)
      await AsyncStorage.setItem('exp', String(result.data.experience))
      navigation.navigate('Profile')
    } else {
      Alert.alert('Неверный логин или пароль')
    }
  }

  return (
    <View className={'px-8 my-auto'}>
      <Text className={'font-bold text-4xl mb-[54] text-white text-center'}>Войдите в свой аккаунт</Text>
      <View className={'mb-4'}>
        <UIField placeholder={'Ваш номер телефона'} value={data.login} onChange={value => setData({...data, login: value})}/>
        <UIField isSecure={true} placeholder={'Ваш пароль'} value={data.pass} onChange={value => setData({...data, pass: value})}/>
      </View>

      <UIButton title={'Войти'} onPress={loginHandler}/>
      <Text className={'text-primary text-center mt-2'} onPress={() => navigation.navigate('Registration')}>Нет аккаунта?</Text>
    </View>
  )
}

export default Login