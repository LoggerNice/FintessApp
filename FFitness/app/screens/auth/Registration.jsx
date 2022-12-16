import {Button, Text, TextInput, View} from "react-native"
import {Link} from "@react-navigation/native";
import React, {useState} from "react";
import UIButton from "../../ui/UIButton";
import UIField from "../../ui/UIField";

const Registration = ({navigation}) => {
  const [data, setData] = useState({login: '', pass: '', repeatPass: ''})
  const regHandler = () => {
    navigation.navigate('Login')

  }

  return (
    <View className={'px-8 my-auto'}>
      <Text className="font-bold text-4xl mb-[54] text-white text-center">Создайте свой аккаунт</Text>

      <View className={'mb-4'}>
        <UIField placeholder={'Ваш логин'} value={data.login} onChange={value => setData({...data, login: value})}/>
        <UIField isSecure={true} placeholder={'Ваш пароль'} value={data.pass} onChange={value => setData({...data, pass: value})}/>
        <UIField isSecure={true} placeholder={'Повторите пароль'} value={data.repeatPass} onChange={value => setData({...data, repeatPass: value})}/>
      </View>

      <UIButton title={'Создать'} onPress={regHandler}/>
      <Text className={'text-primary text-center pt-2'} onPress={() => navigation.navigate('Login')}>Уже есть аккаунт?</Text>
    </View>
  )
}

export default Registration