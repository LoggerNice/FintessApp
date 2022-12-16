import React, {useState} from 'react'
import {Button, Text, TextInput, View} from "react-native"
import UIButton from "../../ui/UIButton";
import UIField from "../../ui/UIField";

const Login = ({ navigation }) => {
  const [data, setData] = useState({login: '', pass: ''})
  const loginHandler = () => {
    navigation.navigate('Home')
  }

  return (
    <View className={'px-8 my-auto'}>
      <Text className={'font-bold text-4xl mb-[54] text-white text-center'}>Войдите в свой аккаунт</Text>

      <View className={'mb-4'}>
        <UIField placeholder={'Ваш логин'} value={data.login} onChange={value => setData({...data, login: value})}/>
        <UIField placeholder={'Ваш пароль'} value={data.pass} isSecure={true} onChange={value => setData({...data, pass: value})}/>
      </View>

      <UIButton title={'Войти'} onPress={loginHandler}/>
      <Text className={'text-primary text-center mt-2'} onPress={() => navigation.navigate('Registration')}>Нет аккаунта?</Text>
    </View>
  )
}

export default Login