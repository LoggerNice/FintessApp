import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from "react-native"
import ProgramList from "./ProgramList"
import {useNavigation} from "@react-navigation/native"
import {getUserStorage} from "../../model/Storage"
import {Ionicons} from "@expo/vector-icons"

const TreningScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {token} = await getUserStorage()
        if(!token) navigation.navigate('Login')
      } catch (e) {
        console.log('Ошибка получения id пользователя.', e)
      }
    }
    fetchData()
  }, [])

  return (
    <View className={'mb-5'}>
      <View className={'mx-4 mt-5 mb-6 flex flex-row justify-between items-center'}>
        <View className={'flex-row items-center'}>
          <Ionicons name="newspaper" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-3'}>Программа</Text>
        </View>
        <View className={'flex flex-row'}>
          <TouchableOpacity onPress={() => {console.log('Переадресация на страницу с заметками')}} className={'ml-4'}>
            <Ionicons name={"heart-sharp"} size={30} color="white" backgroundColor='none'/>
          </TouchableOpacity>
        </View>
      </View>
      <View className={'w-screen mt-2'}>
        <ProgramList isHorizontal={false}/>
      </View>
    </View>
  )
}

export default TreningScreen