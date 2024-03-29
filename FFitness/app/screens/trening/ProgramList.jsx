import {Alert, Image, ScrollView, Text, TouchableHighlight, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {URLA} from "../../../axios"
import UIButton from "../../ui/UIButton"
import axios from "axios"
import React, {useEffect, useState} from "react"
import {getUserStorage} from "../../model/Storage"

export const compareByDay = (a, b) => {
  const daysOrder = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
  const dayA = daysOrder.indexOf(a[0].nameDay)
  const dayB = daysOrder.indexOf(b[0].nameDay)
  return dayA - dayB
}

const ProgramList = ({userID, isHorizontal}) => {
  const navigation = useNavigation()
  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

  const [program, setProgram] = useState([])
  const [isLoadingProgram, setIsLoadingProgram] = useState(false)

  const day = new Date().getDay()
  const currentDayOfWeek = day === 0 ? 6 : (day - 1)
  const dataForRender = {
    images: ['https://recordregion.ru/wp-content/uploads/c/8/f/c8fcfaf6ed06d0641c5fbb6912cc01fe.jpeg', 'https://sun9-23.userapi.com/impf/c637222/v637222854/351b5/iJWku9ILIEI.jpg?size=1280x905&quality=96&sign=f1a2822d673dc399148c25d96d561d49&c_uniq_tag=mGB9omhpBEZcpZyx09fzpCMdmuE0Y3NkpaZzzRaYODk&type=album'],
    numberDay: ['Первый', 'Второй', 'Третий', 'Четвертый', 'Пятый']
  }

  useEffect(() => {
    const fetchData = async () => {
      const {id, role} = await getUserStorage()
      const response = await axios.get(`${URLA}/program/${role === 'user' ? id : userID}`)
      setProgram(response.data.program.training)
      setIsLoadingProgram(!!response)
    }

    fetchData()
  }, [program])

  const generateProgram = async () => {
    const {id} = await getUserStorage()
    const responseMedical = await axios.get(`${URLA}/medical/${id}`)
    const medical = responseMedical.data.form

    if(!responseMedical) return Alert.alert('Ошибка!', 'Заполните мед анкету в личном кабинете', [{text: 'Перейти', onPress: () => navigation.navigate('EditMed', {medical})}])
    if(!medical.access) return Alert.alert('Ошибка!', 'Извините, но у вас нет доступа к тренировкам')

    const result = await axios.post(`${URLA}/program/generate`, {form: medical})
    setProgram(result.data.program.training)
    setIsLoadingProgram(true)
    navigation.navigate('Trening')
  }

  const addHandle = async () => {
    const maxCount = program[0][0].difficulty === 'Опытный' ? 5 : 3

    if (program.length < maxCount) {
      Alert.alert('Отказано', `Максимум тренировок на неделе - ${maxCount}`)
    } else {
      const list = program.map(day=> day[0].nameDay)
      const uniqueDay = daysOfWeek.filter((day) => !list.includes(day))

      const newTreningDay = [{
        part: "",
        type: "Силовая",
        difficulty: "",
        gif: "",
        description: "",
        name: "",
        photo: "",
        sets: 0,
        repetitions: 0,
        nameDay: uniqueDay[0]
      }]

      const update = [...program, newTreningDay]
      const {id, role} = await getUserStorage()
      const data = {training: update.sort(compareByDay)}
      await axios.patch(`${URLA}/program/${role === 'user' ? id : userID}`, {data})

      setProgram(prevState => {
        return [...prevState, update.sort(compareByDay)]
      })
    }
  }

  if(!isLoadingProgram) { return (
    <View className={'space-y-3 items-center -ml-4'}>
      <View className={'w-[270px]'}>
        <UIButton title={'Создать вручную'} onPress={addHandle}/>
      </View>
      <View className={'w-[270px]'}>
        <UIButton title={'Сгенерировать'} onPress={generateProgram}/>
      </View>
    </View>
  )}

  return (
    <ScrollView horizontal={isHorizontal}>
      <View className={isHorizontal ? '' : 'h-full mb-[150px]'}>
        <View className={isHorizontal ? 'flex-row space-x-6' : 'flex-col space-y-6 mx-4'}>
          {program?.map((day, idx) =>
            <TouchableHighlight onPress={() => navigation.navigate('DayTrening', {trening: program, userID, idx})} key={idx}>
              <View className={`${isHorizontal ? 'w-[300px] h-[300px]' : 'h-[150px]'} relative ${daysOfWeek[currentDayOfWeek] === day[0].nameDay && 'border-primary border-2 rounded-2xl'}`}>
                <Image source={{uri: `${day[0].type === 'Кардио' ? dataForRender.images[0] : dataForRender.images[1]}`}} resizeMode="cover" className={'flex-1 opacity-50 rounded-2xl'}/>
                <View className={`${isHorizontal ? 'py-[30px]' : 'w-full flex-col justify-between h-full py-[20px]'} pl-[40px] pr-[40px] absolute bottom-0 left-0`}>
                  {isHorizontal ?
                    <View className={'mb-1'}>
                      <Text className={'font-bold text-2xl text-white'}>{dataForRender.numberDay[idx]} день</Text>
                    </View>
                    :
                    <View className={'flex-row justify-between items-end'}>
                      <Text className={'font-bold text-2xl text-white'}>{day[0].nameDay}</Text>
                      <Text className={'text-lg text-white'}>0{idx + 1} день</Text>
                    </View>
                  }
                  <View className={'flex-row'}>
                    <Text className={'text-white'}>{day.length} упражнений</Text>
                    <Text className={'text-white px-5'}>|</Text>
                    <Text className={'text-white'}>{day[0].type}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
        </View>
        {!isHorizontal &&
          <View className={'mt-8 mx-4'}>
            <UIButton title={'Добавить тренировку'} onPress={addHandle}/>
          </View>
        }
      </View>
    </ScrollView>
  )
}

export default ProgramList