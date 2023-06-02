import React, {useEffect, useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import PostsList from "./posts/PostsList"
import ProgramList from "../trening/ProgramList"
import {getUserStorage} from "../../model/Storage"
import {Ionicons} from "@expo/vector-icons"

const HomeScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState({id: '', token: '', name: ''})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {id, token, name} = await getUserStorage()
        if(!token) navigation.navigate('Login')
        setUser({id: id, token: token, name: name})
      } catch (e) {
        console.log('Ошибка получения данных пользователя.', e)
      }
    }
    fetchData()
  }, [user])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className={'mx-4 mb-4'}>
        <View className={'mt-5 mb-6 flex flex-row justify-between items-center'}>
          <View className={'flex-row items-center'}>
            <Ionicons name="newspaper" size={30} color="white" backgroundColor='null'/>
            <Text className={'font-semibold text-xl text-white pl-3'}>Новости</Text>
          </View>
        </View>

        <Text className={'font-bold text-4xl text-white mb-5'}>Привет, {user.name} 👋</Text>

        <View className={'flex-row justify-between mb-5'}>
          <Text className={'text-xl text-white'}>Тренировка на сегодня</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Trening')}>
            <Text className={'my-auto text-primary'}>Перейти ➔</Text>
          </TouchableOpacity>
        </View>
        <View className={'-mr-4'}>
          <ProgramList userID={user.id} isHorizontal={true}/>
        </View>

        <View className={'flex-row justify-between mt-7 mb-5'}>
          <Text className={'text-xl text-white'}>Последние новости</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PostsFull')}>
            <Text className={'my-auto text-primary'}>Ещё больше ➔</Text>
          </TouchableOpacity>
        </View>
        <View className={'-mr-4'}>
          <PostsList isHorizontal={true}/>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen;