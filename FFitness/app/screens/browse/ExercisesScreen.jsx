import React, {useEffect, useState} from 'react'
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import {Image, Text, TouchableOpacity, View, ScrollView, TouchableHighlight} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {URLA} from "../../../axios"
import useFetch from "../../model/UseFetch"
import UIAdd from "../../ui/UIAdd"
import UILike from "../../ui/UILike"
import UISearch from "../../ui/UISearch"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ExercisesScreen = () => {
  const navigation = useNavigation()
  const url = `${URLA}/exercises`
  const {data, isLoading} = useFetch(url)
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const _role = await AsyncStorage.getItem('role')
      setRole(_role)
    }

    fetchData()
  }, [role])

  if(!isLoading) {
    return (
      <View className={'items-center'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mx-4'}>
      <View className={'mt-5 mb-6 flex flex-row justify-between items-center'}>
        <View className={'flex-row items-center'}>
          <Ionicons name="list" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-3'}>Упражнения</Text>
        </View>
        {role === 'user' ?
          <View className={'flex flex-row'}>
            <UISearch/>
            <TouchableOpacity className={'ml-4'} onPress={() => {console.log('Переадресация на страницу с заметками')}}>
              <Ionicons name={"heart-sharp"} size={30} color="white" backgroundColor='none'/>
            </TouchableOpacity>
          </View>
          :
          <View className={'flex flex-row'}>
            <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate('Add', {isNews: false})}>
              <Ionicons name={"add-circle"} size={30} color="white" backgroundColor='none'/>
            </TouchableOpacity>
          </View>
        }
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'flex-row w-full h-full flex-wrap justify-between mb-20'}>
          {data.exercise.map(exercise =>
            <TouchableHighlight key={exercise._id} onPress={() => navigation.navigate('Exercise', {id: exercise._id, role: role})}>
              <View className={'relative w-[175px] h-[230px] mb-3'}>
                <Image source={{uri: exercise.photo}} blurRadius={3} resizeMode='cover' className={'flex-1 opacity-50 rounded-2xl'}/>
                {role === 'user' && <View className={'flex-row justify-between absolute pt-[15px] pr-4 w-full'}>
                  <UILike/>
                  <UIAdd/>
                </View>}
                <View className={'pl-[20px] pb-[25px] absolute bottom-0 left-0'}>
                  <Text className={'font-bold text-[18px] text-white pb-1'}>{exercise.name}</Text>
                  <Text className={'text-white text-sm opacity-80'}>{exercise.difficulty === 'Начинающий' ? 'Лёгкий': exercise.difficulty} уровень</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default ExercisesScreen;