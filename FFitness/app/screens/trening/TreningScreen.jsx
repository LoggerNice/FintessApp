import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from "react-native"
import ProgramList from "./ProgramList"
import {useNavigation} from "@react-navigation/native"
import {getUserStorage} from "../../model/Storage"
import {Ionicons} from "@expo/vector-icons"

const TreningScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState({id: ''})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {id, token} = await getUserStorage()
        if(!token) navigation.navigate('Login')
        setUser({id: id})
      } catch (e) {
        console.log('Ошибка получения id пользователя.', e)
      }
    }
    fetchData()
  }, [])

  return (
    <View>
      <View className={'mt-5 mx-4 flex flex-row justify-between items-center'}>
        <View className={'flex-row items-center'}>
          <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-2'}>Тренировки</Text>
        </View>
        <View className={'flex flex-row'}>
          <TouchableOpacity onPress={() => {}} className={'ml-4'}>
            <Ionicons name={"heart-sharp"} size={30} color="white" backgroundColor='none'/>
          </TouchableOpacity>
        </View>
      </View>
      <View className={'items-center mt-7'}>
        <ProgramList userID={user.id}/>
      </View>
    </View>
  )
}

export default TreningScreen