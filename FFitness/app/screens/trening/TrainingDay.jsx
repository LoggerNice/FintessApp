import React, { useState } from 'react'
import {View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Image, Alert} from 'react-native'
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import UIButton from "../../ui/UIButton"
import Timer from "./Timer"
import axios from "axios"
import {URLA} from "../../../axios"
import {getUserStorage} from "../../model/Storage"

const TreningDay = ({ route }) => {
  const navigation = useNavigation()
  const {day} = route.params
  const [program, setProgram] = useState(day)
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const handleConfirmation = () => {
    Alert.alert(
      'Вы уверены, что хотите завершить тренировку?',
      'После завершения её продолжить нельзя будет',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Да', onPress: async () => {
            setIsVisible(prevState => !prevState)
            setIsActive(prevState => !prevState)

            const {id, exp} = await getUserStorage()
            const data = {experience: exp}
            await axios.patch(`${URLA}/profile/${id}`, {data})
          }},
      ],
      { cancelable: false }
    )
  }

  if(isVisible) return (
    <View className={'h-full mt-5'}>
      <Timer day={program}/>
      <View className={'mx-4 mt-3'}>
        <UIButton title={'Завершить'} onPress={handleConfirmation}/>
      </View>
    </View>
  )

  return (
    <View className={'mx-4 mb-6'}>
      <View className={'my-5 flex flex-row justify-between items-center'}>
        <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center'}>
          <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
        </TouchableOpacity>
        <View className={'flex flex-row'}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons  name="settings-input-component" size={30} color="white" backgroundColor='null'/>
          </TouchableOpacity>
        </View>
      </View>
      <View className={'mb-5'}>
        <Text className={'text-white text-3xl font-bold mb-4'}>{program[0].nameDay}</Text>
        {isActive ?
          <UIButton title={'Начать тренировку'} onPress={() => {setIsVisible(prevState => !prevState)}}/>
        :
          <UIButton title={'Тренировка выполнена'} onPress={() => {}}/>
        }
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className={'flex-row w-full flex-wrap justify-between'}>
            {program?.map(exercise =>
              <TouchableHighlight key={exercise._id} onPress={() => navigation.navigate('Exercise', {id: exercise._id})}>
                <View className={'relative w-[175px] h-[230px] mb-3'}>
                  <Image source={{uri: exercise.photo}} resizeMode='cover' blurRadius={3} className={'flex-1 opacity-50 rounded-2xl'}/>
                  <View className={'items-end absolute pt-[15px] pr-4 w-full'}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <MaterialIcons name="edit" size={30} color="white" backgroundColor='null'/>
                    </TouchableOpacity>
                  </View>
                  <View className={'pl-[20px] pb-[25px] absolute bottom-0 left-0'}>
                    <Text className={'font-bold text-xl text-white pb-1'}>{exercise.name}</Text>
                    <Text className={'text-white text-[16px]'}>{exercise.sets} x {exercise.repetitions} раз</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </ScrollView>
    </View>
  )
}

export default TreningDay