import {Image, ScrollView, Text, View} from "react-native"
import UIHeader from "../../ui/UIHeader"
import {URLA} from "../../../axios"
import useFetch from "../../model/UseFetch"
import React from "react"
import UIButton from "../../ui/UIButton"

const ExercisesScreen = ({route}) => {
  const { id } = route.params
  const url = `${URLA}/exercises/${id}`
  const {data, isLoading} = useFetch(url)

  if(!isLoading) {
    return (
      <View className={'items-center'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mt-5 h-full'}>
      <View className={'mb-6 mx-4'}>
        <UIHeader/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className={'flex-1'}>
        <Image source={{uri: data.exercise.gif}} resizeMode='cover' className={'w-full h-96 rounded-lg'}/>
        <View className={'mx-4 mb-10'}>
          <Text className={'text-white font-bold text-3xl my-4'}>{data.exercise.name}</Text>
          <Text className={'text-white font-semibold text-lg'}>{data.exercise.difficulty === 'Начинающий' ? 'Лёгкий': data.exercise.difficulty} уровень</Text>
          <View className={'bg-white h-[1px] my-3'}/>
          <Text className={'text-white text-[15px] mb-5'}>{data.exercise.description}</Text>
          <UIButton title={'Добавить в тренировку'} onPress={() => {console.log('Добавление')}}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default ExercisesScreen