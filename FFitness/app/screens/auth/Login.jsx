import React, {useEffect, useRef, useState} from 'react'
import {Alert, Text, View} from "react-native"
import axios from "axios"
import {useNavigation} from "@react-navigation/native"
import UIButton from "../../ui/UIButton"
import UIField from "../../ui/UIField"
import {URLA} from "../../../axios"
import {setUserStorage} from "../../model/Storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Icon, Slider} from "@rneui/themed";

const Login = () => {
  const navigation = useNavigation()
  const [data, setData] = useState({login: '89173085293', pass: 'vadim2323'})

  const [isVerified, setIsVerified] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  const {login, pass} = data
  const fields = {
    login,
    pass,
  }

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      const role = AsyncStorage.getItem('role').then(r => console.log('Ошибка получения роли пользователя.', r))
      if(token) {
        setIsVerified(true)
        if (String(role) === 'user')
          navigation.navigate('Navigation')
        else
          navigation.navigate('NavigationMed')
      }
    }).catch(e => {
      console.log('Ошибка получения токена пользователя.', e)
    })
  }, [])

  const handleSliderChange = (value) => {
    setSliderValue(value)
  }

  const handleVerification = () => {
    if (sliderValue >= 8 && sliderValue <= 9) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
      Alert.alert('Повторите ещё раз')
    }
  }

  const fetchAPI = async () => {
    try {
      return await axios.post(`${URLA}/login`, fields)
    } catch (e) {
      console.log('Ошибка отправки данных на сервер:', e)
    }
  }

  const loginHandler = async () => {
    const result = await fetchAPI()
    const role = result.data.role

    if (result) {
      await setUserStorage(result)
      if (role === 'user')
        navigation.navigate(result.data.acceptInstruction ? 'Navigation' : 'Instruction')
      else
        navigation.navigate('NavigationMed')
    } else {
      Alert.alert('Неверный логин или пароль')
    }
  }

  return (
    <View className={'px-8 my-auto'}>
      {isVerified ?
        (
          <View className={'pb-4'}>
            <Text className={'font-bold text-4xl mb-16 text-white text-center'}>Войдите в свой аккаунт</Text>
            <View className={'mb-4'}>
              <UIField placeholder={'Ваш номер телефона'}
                       value={data.login}
                       onChange={value => setData({...data, login: value})}/>
              <UIField isSecure={true}
                       placeholder={'Ваш пароль'}
                       value={data.pass}
                       onChange={value => setData({...data, pass: value})}/>
            </View>

            <UIButton title={'Войти'} onPress={loginHandler}/>
            <Text className={'text-primary text-center mt-2'} onPress={() => navigation.navigate('Registration')}>Нет аккаунта?</Text>
          </View>
        ) : (
        <View className={'text-col items-center justify-center'}>
          <Text className={'text-2xl mb-16 text-white items-center text-center'}>Выберите число 8 или 9</Text>
          <Slider
            style={{ width: '80%', marginTop: 20 }}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
            thumbProps={{
              children: (
                <Icon
                  name="heartbeat"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 10, right: 10 }}
                  color={'#6842FF'}
                />
              ),
            }}
          />
          <Text className={'text-2xl mb-6 mt-2 text-white items-center text-center'}>{sliderValue}</Text>
          <UIButton title="Подтвердить" onPress={handleVerification} />
        </View>
      )}
    </View>
  )
}

export default Login