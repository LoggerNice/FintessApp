import {Alert, Text, View} from "react-native"
import React, {useState} from "react"
import axios from "axios"

import UIButton from "../../ui/UIButton"
import UIField from "../../ui/UIField"
import {URLA} from "../../../axios";

const Registration = ({navigation}) => {
  const [user, setUser] = useState({login: '', name: '', pass: '', repeatPass: ''})

  const { login, name, pass, repeatPass } = user
  const fields = {
    login,
    name,
    pass,
    repeatPass
  }

  const fetchAPI = async () => {
    try {
      const res = await axios.post( `${URLA}/registration`, fields)
    } catch (e) {
      console.log('Ошибка отправки данных на сервер:', e)
      Alert.alert('Ошибка регистрации')
    }
  }

  const regHandler = async () => {
    if (validateForm()) {
      await fetchAPI()
      navigation.navigate('Login')
    }
  }

  const validatePhone = (login) => {
    const pattern = /^[0-9]{11}$/
    return pattern.test(login)
  }

  const validateName = (name) => {
    const pattern = /^[a-zA-Z]{2,}$/
    return pattern.test(name)
  }

  const validatePassword = (password) => {
    return password.length > 8
  }

  const validateForm = () => {
    const isValidPhone = validatePhone(user.login)
    const isValidPassword = validatePassword(user.pass)
    const isValidName = validateName(user.name)

    if (!isValidPhone) {
      Alert.alert('Неверный номер телефона')
      return false
    }

    if (!isValidName) {
      Alert.alert('Неправильно указано имя')
      return false
    }

    if (!isValidPassword) {
      Alert.alert('Пароль должен быть больше 8 символов')
      return false
    }

    if (user.pass !== user.repeatPass) {
      Alert.alert('Пароли не совпадают')
      return false
    }

    return true
  }

  return (
    <View className={'px-8 my-auto'}>
      <Text className="font-bold text-4xl mb-[54] text-white text-center">Создайте свой аккаунт</Text>
      <View className={'mb-4'}>
        <UIField placeholder={'Ваш номер телефона'} value={user.login} onChange={value => setUser({...user, login: value})}/>
        <UIField placeholder={'Ваше имя'} value={user.name} onChange={value => setUser({...user, name: value})}/>
        <UIField isSecure={true} placeholder={'Ваш пароль'} value={user.pass} onChange={value => setUser({...user, pass: value})}/>
        <UIField isSecure={true} placeholder={'Повторите пароль'} value={user.repeatPass} onChange={value => setUser({...user, repeatPass: value})}/>
      </View>
      <UIButton title={'Создать'} onPress={regHandler}/>
      <Text className={'text-primary text-center pt-2'} onPress={() => navigation.navigate('Login')}>Уже есть аккаунт?</Text>
    </View>
  )
}

export default Registration