import {Alert, Image, ScrollView, Text, TouchableHighlight, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {URLA} from "../../../axios"
import useFetch from "../../model/UseFetch"
import UIButton from "../../ui/UIButton"
import axios from "axios"

const ProgramList = ({userID, isHorizontal}) => {
  const navigation = useNavigation()
  const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const currentDayOfWeek = new Date().getDay()

  const {data, isLoading: isLoadingForm} = useFetch(`${URLA}/medical/${userID}`)
  let {data: program, isLoading: isLoadingProgram} = useFetch(`${URLA}/program/${userID}`)
  const dataForRender = {
    images: ['https://recordregion.ru/wp-content/uploads/c/8/f/c8fcfaf6ed06d0641c5fbb6912cc01fe.jpeg', 'https://sun9-23.userapi.com/impf/c637222/v637222854/351b5/iJWku9ILIEI.jpg?size=1280x905&quality=96&sign=f1a2822d673dc399148c25d96d561d49&c_uniq_tag=mGB9omhpBEZcpZyx09fzpCMdmuE0Y3NkpaZzzRaYODk&type=album'],
    numberDay: ['Первый', 'Второй', 'Третий']
  }

  const generateProgram = async () => {
    const {form} = data
    if(!isLoadingForm) return Alert.alert('Ошибка!', 'Заполните мед анкету в личном кабинете', [{text: 'Перейти', onPress: () => navigation.navigate('EditMed', {form})}])
    if(!form.access) return Alert.alert('Ошибка!', 'Извините, но у вас нет доступа к тренировкам')

    const result = await axios.post(`${URLA}/program/generate`, {form})
    result ? isLoadingProgram = true : isLoadingProgram = false
    navigation.navigate('Trening')
  }

  if(!isLoadingProgram) return (
    <View className={'space-y-3 items-center -ml-4'}>
      <View className={'w-[270px]'}>
        <UIButton title={'Создать вручную'} onPress={() => {}}/>
      </View>
      <View className={'w-[270px]'}>
        <UIButton title={'Сгенерировать'} onPress={generateProgram}/>
      </View>
    </View>
  )

  return (
    <ScrollView horizontal={isHorizontal}>
        <View className={isHorizontal ? 'flex-row space-x-6' : 'flex-col space-y-6 mx-4'}>
          {program.program.training.map((day, idx) =>
            <TouchableHighlight onPress={() => navigation.navigate('DayTrening', {day})} key={idx}>
              <View className={`${isHorizontal ? 'w-[300px] h-[300px]' : 'h-[150px]'} relative ${daysOfWeek[currentDayOfWeek] === day[0].nameDay && 'border-primary border-2 rounded-2xl'}`}>
                <Image source={{uri: `${day[idx].type === 'Кардио' ? dataForRender.images[0] : dataForRender.images[1]}`}} resizeMode="cover" className={'flex-1 opacity-50 rounded-2xl'}/>
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
                    <Text className={'text-white'}>{day[idx].type}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
        </View>
    </ScrollView>
  )
}

export default ProgramList