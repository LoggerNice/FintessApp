import {Image, ScrollView, Text, TouchableHighlight, View} from "react-native"
import React, {useEffect, useState} from "react"
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import ProgramList from "../trening/ProgramList"
import MedForm from "../form/MedForm"
import {clearStorage, getUserStorage} from "../../model/Storage"
import {useNavigation} from "@react-navigation/native"
import axios from "axios";
import {URLA} from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState({id: '', role: '', token: '', name: '', exp: 0, photo: "https://www.pinclipart.com/picdir/big/165-1653686_female-user-icon-png-download-user-colorful-icon.png"})
  const level = Math.floor(user.exp / 100)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {id, token, role} = await getUserStorage()
        const response = await axios.get(`${URLA}/profile/${id}`)
        if(!token) navigation.navigate('Login')
        setUser({id: id, role: role, token: token, name: response.data.name, exp: response.data.experience, photo: response.data.avatarURL})
        await AsyncStorage.setItem('name', String(user.name))
      } catch (e) {
        console.log('Ошибка получения данных пользователя.', e)
      }
    }
    fetchData()
  }, [user])

  const logout = async () => {
    try {
      await clearStorage()
      navigation.navigate('Login')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View className={'mt-5 mx-4'}>
      <View className={'items-center'}>
        <View className={'flex flex-row justify-between w-screen px-4'}>
          <TouchableHighlight onPress={() => navigation.navigate('EditProfile', {user})}>
            <MaterialCommunityIcons name="account-edit" size={34} color="white" backgroundColor='null'/>
          </TouchableHighlight>
          <View className={'w-32 h-32 relative'}>
            <Image style={{borderColor: '#6842FF', borderWidth: 2}} source={{uri: user.photo}} resizeMode="cover" className={'flex-1 rounded-full w-full h-full'}/>
          </View>
          <TouchableHighlight onPress={logout}>
            <Ionicons name="exit-outline" size={32} color="white" backgroundColor='null'/>
          </TouchableHighlight>
        </View>
        <Text className={'font-bold text-3xl text-center w-screen pt-2 text-white'}>{user.name}</Text>
      </View>
      <View className={'mb-5'}>
        <View className={'mt-4 py-4 bg-input rounded-2xl'}>
          <View className={'flex-row px-5'}>
            <Text style={{borderColor: '#BCB3E2', borderWidth: 5}}
                  className={'font-bold my-auto bg-primary pt-[10px] text-center rounded-full text-xl w-[50px] h-[50px] text-white'}>{level}
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
        <MedForm userID={user.id}/>
        {user.role !== 'medic' &&
          <View>
            <View className={'flex-row justify-between mb-5'}>
              <Text className={'text-xl text-white'}>Тренировки</Text>
              <TouchableHighlight onPress={() => navigation.navigate('Trening')}>
                <Text className={'my-auto text-primary'}>Перейти ➔</Text>
              </TouchableHighlight>
            </View>
            <View className={'-mr-4'}>
              <ProgramList userID={user.id} isHorizontal={true}/>
            </View>
          </View>
        }
      </View>
    </View>
    </ScrollView>
  )
}

export default ProfileScreen