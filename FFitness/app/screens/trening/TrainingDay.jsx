import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, TouchableHighlight, Image, Alert} from 'react-native'
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import UIButton from "../../ui/UIButton"
import Timer from "./Timer"
import axios from "axios"
import {URLA} from "../../../axios"
import {getUserStorage} from "../../model/Storage"
import {compareByDay} from "./ProgramList";

const TreningDay = ({ route }) => {
  const navigation = useNavigation()
  const {trening, userID, idx} = route.params
  const [isVisible, setIsVisible] = useState(false)
  const [program, setProgram] = useState(trening)

  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  const day = new Date().getDay()
  const currentDayOfWeek = day === 0 ? 6 : (day - 1)
  const [isActive, setIsActive] = useState(currentDayOfWeek <= daysOfWeek.indexOf(trening[idx][0].nameDay))

  useEffect(() => {
    const fetchData = async () => {
      const {id, role} = await getUserStorage()
      const response = await axios.get(`${URLA}/program/${role === 'user' ? id : userID}`)
      setProgram(response.data.program.training.sort(compareByDay))
    }
    fetchData()
  }, [program])


  const handleConfirmation = () => {
    Alert.alert(
      'Вы уверены, что хотите завершить тренировку?',
      'После завершения её продолжить нельзя будет',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Да', onPress: async () => {
            setIsVisible(prevState => !prevState)
            setIsActive(false)

            const {id, exp} = await getUserStorage()
            const data = {experience: exp}
            await axios.patch(`${URLA}/profile/${id}`, {data})
          }},
      ],
      { cancelable: false }
    )
  }

  const addHandle = () => {
    navigation.navigate('Browse', {trening, userID, idx})
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
          <TouchableOpacity onPress={() => navigation.navigate('EditDay', {trening, idx})}>
            <MaterialIcons  name="settings-input-component" size={30} color="white" backgroundColor='null'/>
          </TouchableOpacity>
        </View>
      </View>
      <View className={'mb-5'}>
        <Text className={'text-white text-3xl font-bold mb-4'}>{program[idx][0].nameDay}</Text>
        {isActive ?
          <UIButton title={'Начать тренировку'} onPress={() => {setIsVisible(prevState => !prevState)}}/>
        :
          <UIButton title={'Тренировка выполнена'} onPress={() => {}}/>
        }
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className={'flex-row w-full h-full mb-52 flex-wrap justify-between'}>
            {program[idx][0].name && program[idx].map(exercise =>
              <TouchableHighlight key={exercise._id} onPress={() => navigation.navigate('Exercise', {id: exercise._id})}>
                <View className={'relative w-[175px] h-[230px] mb-3'}>
                  <Image source={{uri: exercise.photo}} resizeMode='cover' blurRadius={3} className={'flex-1 opacity-50 rounded-2xl'}/>
                  <View className={'pl-[20px] pb-[25px] absolute bottom-0 left-0'}>
                    <Text className={'font-bold text-xl text-white pb-1'}>{exercise.name}</Text>
                    <Text className={'text-white text-[16px]'}>{exercise.sets} x {exercise.repetitions} раз</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            <TouchableHighlight onPress={addHandle}>
              <View className={'relative w-[175px] h-[230px] mb-3 bg-primary rounded-2xl'}>
                <View className={'flex-col items-center justify-center my-auto'}>
                  <Ionicons name={'add-circle-outline'} size={30} color='white' backgroundColor='none'/>
                  <Text className={'font-bold text-xl text-white text-center'}>Добавить</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
    </View>
  )
}

export default TreningDay