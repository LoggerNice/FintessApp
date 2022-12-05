import React from 'react'
import {Button, Text, TextInput, View} from "react-native"
import { Link } from '@react-navigation/native'

const Login = () => {
  return (
    <View>
      <Text className="font-bold text-3xl mb-[54]">Войдите в свой аккаунт</Text>

      <View>
        <View className="relative mb-2">
          <Text>Ваш логин</Text>
          <TextInput type="text" id="floating_outlined"
                     className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" "/>
        </View>
        <View className="relative mb-2">
          <Text>Ваш пароль</Text>
          <TextInput type="text" id="floating_outlined"
                     className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" "/>
        </View>

        <Link to={{screen: 'Registration'}}>У вас нет аккаунта?</Link>
        <View className="mt-4">
          <Button title='Войти'/>
        </View>
      </View>
    </View>
  )
}

export default Login