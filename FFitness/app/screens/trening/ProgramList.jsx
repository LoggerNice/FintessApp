import {Alert, AlertButton, Image, ScrollView, Text, View} from "react-native"
import {useState} from "react"
import {useNavigation} from "@react-navigation/native"
import {URLA} from "../../../axios";
import useFetch from "../../model/UseFetch";
import UIButton from "../../ui/UIButton";
import axios from "axios";

const ProgramList = ({userID}) => {
  const navigation = useNavigation()
  const image = { uri: "https://recordregion.ru/wp-content/uploads/2/8/a/28a632680cffcb6eb240cfc4a07d0225.jpeg" }
  const [training, setTraining] = useState({type: 'Кардио', count: 5})

  const programData = useFetch(`${URLA}/program/${userID}`)
  const medFormData = useFetch(`${URLA}/medical/${userID}`)
  const {data: {form}, isLoading} = medFormData
  const createProgram = () => {

  }

  const generateProgram = async () => {
    if(!isLoading) return Alert.alert('Ошибка!', 'Заполните мед анкету в личном кабинете', [{text: 'Перейти', onPress: () => navigation.navigate('EditMed', {form})}])
    if(!form.access) return Alert.alert('Ошибка!', 'Извините, но у вас нет доступа к тренировкам')

    await axios.post(`${URLA}/program/create`, {form})
  }

  return (
    <ScrollView horizontal={true}>
      {programData.isLoading ?
        <View className={'flex-row space-x-6'}>
          <View className={'relative w-[300px] h-[300px]'}>
            <Image source={image} resizeMode="cover" className={'flex-1 opacity-50 rounded-2xl'}/>
            <View className={'pl-[40px] pb-[30px] absolute bottom-0 left-0'}>
              <Text className={'font-semibold text-[22px] text-white pb-1'}>Первый день</Text>
              <View className={'flex-row '}>
                <Text className={'text-txt'}>{training.count} упражнений</Text>
                <Text className={'text-txt px-5'}>|</Text>
                <Text className={'text-txt'}>{training.type}</Text>
              </View>
            </View>
          </View>

          <View className={'relative w-[300px] h-[300px]'}>
            <Image source={image} resizeMode="cover" className={'flex-1 opacity-50 rounded-2xl'}/>
            <View className={'pl-[40px] pb-[30px] absolute bottom-0 left-0'}>
              <Text className={'font-semibold text-[22px] text-white pb-1'}>Первый день</Text>
              <View className={'flex-row '}>
                <Text className={'text-txt'}>{training.count} упражнений</Text>
                <Text className={'text-txt px-5'}>|</Text>
                <Text className={'text-txt'}>{training.type}</Text>
              </View>
            </View>
          </View>
        </View>
        :
        <View className={'space-y-3 w-[270px]'}>
          <View>
            <UIButton title={'Создать вручную'} onPress={createProgram}/>
          </View>
          <View>
            <UIButton title={'Сгенерировать'} onPress={generateProgram}/>
          </View>
        </View>
      }
    </ScrollView>
  )
}

export default ProgramList