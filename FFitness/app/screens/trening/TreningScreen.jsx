import React, {useEffect} from 'react'
import {Text, View} from "react-native"
import ProgramList from "./ProgramList"
import {useNavigation} from "@react-navigation/native"
import {getUserStorage} from "../../model/Storage"
import {Ionicons} from "@expo/vector-icons"

const TreningScreen = ({ route }) => {
  const navigation = useNavigation()
  const {user} = route.params || {}

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
      </View>
      <View className={'w-screen mt-2'}>
        <ProgramList userID={user?._id}  isHorizontal={false}/>
      </View>
    </View>
  )
}

export default TreningScreen