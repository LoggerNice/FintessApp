import {Image, Text, View} from "react-native"
import UILike from "../../ui/UILike"
import UIAdd from "../../ui/UIAdd"
import React from "react"

const ExerciseCard = ({exercise, role, onPress, isLikes}) => {
  return (
    <View className={'relative w-[175px] h-[230px] mb-3'}>
      <Image source={{uri: exercise.photo}} blurRadius={3} resizeMode='cover' className={'flex-1 opacity-50 rounded-2xl'}/>
      {role === 'user' && <View className={'flex-row justify-between absolute pt-[15px] pr-4 w-full'}>
        <UILike onPress={onPress} isLikes={isLikes}/>
        <UIAdd/>
      </View>}
      <View className={'pl-[20px] pb-[25px] absolute bottom-0 left-0'}>
        <Text className={'font-bold text-[18px] text-white pb-1'}>{exercise.name}</Text>
        <Text className={'text-white text-sm opacity-80'}>{exercise.difficulty === 'Начинающий' ? 'Лёгкий': exercise.difficulty} уровень</Text>
      </View>
    </View>
  )
}

export default ExerciseCard