import React, {useEffect, useState} from 'react'
import {Alert, Modal, Text, View} from "react-native"
import axios from "axios"
import {useNavigation} from "@react-navigation/native"
import UIButton from "../../ui/UIButton"
import UIField from "../../ui/UIField"
import {URLA} from "../../../axios"
import {setUserStorage} from "../../model/Storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Icon, Slider} from "@rneui/themed"

const Login = () => {
  const navigation = useNavigation()
  const [data, setData] = useState({login: '', pass: ''})
  const fields = {
    login: data.login,
    pass: data.pass,
  }

  const [sliderValue, setSliderValue] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      const role = AsyncStorage.getItem('role').then(r => console.log('Ошибка получения роли пользователя.', r))
      if(token) {
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

  const handleVerification = async () => {
    if (sliderValue >= 8 && sliderValue <= 9) {
      const result = await fetchAPI()
      const role = result.data.role

      if (result) {
        await setUserStorage(result)
        if (role === 'user') {
          navigation.navigate(result.data.acceptInstruction ? 'Navigation' : 'Instruction')
        } else {
          navigation.navigate('NavigationMed')
        }
        setModalVisible(false)
      } else {
        Alert.alert('Неверный логин или пароль')
        setModalVisible(false)
      }
    } else {
      Alert.alert('Повторите ещё раз')
    }
  }

  const fetchAPI = async () => {
    try {
      return await axios.post(`${URLA}/login`, fields)
    } catch (e) {
      console.log('Ошибка отправки данных на сервер:', e)
      setModalVisible(false)
    }
  }

  const validateFields = () => {
    if (!data.login) {
      return Alert.alert('Ошибка ввода', 'Вы не ввели логин')
    } else if (!data.pass) {
      return Alert.alert('Ошибка ввода', 'Вы не ввели пароль')
    } else {
      setModalVisible(true)
    }
  }

  const loginHandler = async () => {
    validateFields()
  }

  return (
    <View className={'px-8 my-auto'}>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide" transparent={true}>
        <View className={'text-col items-center justify-center px-8 h-screen bg-second'}>
          <Text className={'text-2xl mb-16 text-white items-center text-center'}>Выберите число 8 или 9</Text>
          <Slider
            style={{ width: '100%', marginTop: 20 }}
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
      </Modal>

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
    </View>
  )
}

export default Login