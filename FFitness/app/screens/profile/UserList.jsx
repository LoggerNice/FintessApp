import {View, Text, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {URLA} from "../../../axios"
import useFetch from "../../model/UseFetch"
import React, {useEffect} from "react"
import {Ionicons} from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserList = () => {
  const navigation = useNavigation()
  const url = `${URLA}/users`
  const {data, isLoading} = useFetch(url)

  useEffect(() => {
    const fetchData = async () => {
      const role = await AsyncStorage.getItem('role')
      if (role === 'user') navigation.navigate('Navigation')
    }

    fetchData()
  }, [])

  if(!isLoading) {
    return (
      <View className={'items-center mt-5'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mx-4'}>
      <View className={'mt-5 mb-6 flex flex-row justify-between items-center'}>
        <View className={'flex-row items-center'}>
          <Ionicons name="newspaper" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-3'}>Список клиентов</Text>
        </View>
      </View>

      <View className={'flex-col space-y-2'}>
        <View className={'flex-row justify-between mb-2'}>
          <Text className={'text-white'}>Имя</Text>
          <Text className={'text-white'}>Номер телефона</Text>
        </View>
        {data.data?.map(user => (
          <TouchableOpacity onPress={() => navigation.navigate('ProfileUser', {user})} key={user._id}>
            <View className={'flex-row justify-between border-y-2 py-2 border-primary'}>
              <Text className={'text-lg text-white'}>{user.name}</Text>
              <Text className={'text-lg text-white'}>{user.login}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default UserList