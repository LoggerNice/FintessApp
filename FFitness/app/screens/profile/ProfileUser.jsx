import {useNavigation} from "@react-navigation/native"
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native"
import React, {useEffect, useState} from "react"
import MedForm from "../form/MedForm"
import ProgramList from "../trening/ProgramList"
import {Ionicons} from "@expo/vector-icons"
import {getUserStorage} from "../../model/Storage"

const ProfileUser = ({ route }) => {
  const navigation = useNavigation()
  const { user } = route.params
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchRole = async () => {
      const {role} = await getUserStorage()
      setRole(role)
    }

    fetchRole()
  }, [])

  return (
    <View className={'mb-20'}>
      <TouchableOpacity onPress={() => navigation.goBack()} className={'ml-4 my-5 flex flex-row items-center'}>
        <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
        <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'mx-4'}>
          <View className={'items-center content-center'}>
            <View>
              <View className={'w-32 h-32 relative'}>
                <Image style={{borderColor: '#6842FF', borderWidth: 2}} source={{uri: user.avatarURL}} resizeMode="cover" className={'flex-1 rounded-full w-full h-full'}/>
              </View>
            </View>
            <Text className={'font-bold text-3xl text-center w-screen pt-2 text-white'}>{user.name}</Text>
          </View>
          <View className={'mb-5'}>
            <MedForm userID={user._id} role={role}/>
            <View className={'flex-row justify-between mb-5'}>
              <Text className={'text-xl text-white'}>Тренировки</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Trening', {user})}>
                <Text className={'my-auto text-primary'}>Перейти ➔</Text>
              </TouchableOpacity>
            </View>
            <View className={'-mr-4 mb-5'}>
              <ProgramList userID={user._id} isHorizontal={true}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileUser