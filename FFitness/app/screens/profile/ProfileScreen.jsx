import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import React, {useEffect, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

import ProgramList from "./ProgramList"
import MedForm from "./MedForm";

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({role: '', token: '', name: 'Вадим', exp: 352, photo: "https://i.yapx.cc/PdTRU.jpg" })
  const level = Math.floor(user.exp / 100)

  const getStorage = async () => {
    const token = await AsyncStorage.getItem('token')
    const name = await AsyncStorage.getItem('name')
    const exp = await AsyncStorage.getItem('exp')
    const role = await AsyncStorage.getItem('role')
    const photo = await AsyncStorage.getItem('photo')

    setUser({role: role, token: token, name: name, exp: exp, photo: photo})
  }

  const clearStorage = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('_id')
    await AsyncStorage.removeItem('name')
    await AsyncStorage.removeItem('exp')
    await AsyncStorage.removeItem('role')
    await AsyncStorage.removeItem('photo')
    navigation.navigate('Login')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getStorage()
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const edit = () => {
    navigation.navigate('EditProfile')
  }

  const trening = () => {
    navigation.navigate('Program')
  }

  const logout = async () => {
    try {
      await clearStorage()
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
    <View className={'my-5 mx-4'}>
      <View className={'items-center'}>
        <View className={'flex flex-row justify-between w-screen'}>
          <MaterialCommunityIcons.Button name="account-edit" size={34} color="white" onPress={edit} backgroundColor='null'/>
          <View className={'w-32 h-32 relative'}>
            <Image style={{borderColor: '#6842FF', borderWidth: 2}} source={{uri: user.photo}} resizeMode="cover" className={'flex-1 rounded-full w-full h-full'}/>
          </View>
          <Ionicons.Button name="exit-outline" size={32} color="white" onPress={logout} backgroundColor='null'/>
        </View>
        <Text className={'font-bold text-3xl text-center w-screen pt-2 text-white'}>{user.name}</Text>
      </View>
      <View className={'mb-5'}>
        <View className={'mt-4 py-4 bg-white rounded-2xl'}>
          <View className={'flex-row px-5'}>
            <Text style={{borderColor: '#BCB3E2', borderWidth: 5}} className={'font-bold my-auto bg-primary pt-[10px] text-center rounded-full text-xl w-[50px] h-[50px] text-white'}>{level}
            </Text>
            <View className={'w-full px-5'}>
              <View className={'flex-row justify-between pr-8'}>
                <Text className={'font-semibold text-xl'}>Уровень {level}</Text>
                <Text className={'my-auto opacity-50 font-semibold'}>{user.exp % 100} / 100</Text>
              </View>
              <Text className={'opacity-50'}>До {level + 1} уровня {100 - user.exp % 100} очков</Text>
            </View>
          </View>
        </View>
        <MedForm/>
        <View className={'flex-row justify-between mb-5'}>
          <Text className={'text-xl text-white'}>Тренировки</Text>
          <TouchableOpacity onPress={trening}>
            <Text className={'my-auto text-primary'}>Перейти -></Text>
          </TouchableOpacity>
        </View>
        <ProgramList/>
      </View>
    </View>
    </ScrollView>
  )
}

export default ProfileScreen