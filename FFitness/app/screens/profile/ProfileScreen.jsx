import {Image, Text, TouchableHighlight, View} from "react-native"
import {useState} from "react";

import ProgramList from "../trening/ProgramList";

const ProfileScreen = () => {
  const [user, setUser] = useState({name: 'Вадим', exp: 352, photo: { uri: "https://i.yapx.cc/PdTRU.jpg" }})
  const onPress = () => {}

  // Кнопка редактирования
  // Кнопка смены темы

  return (
    <View className={'pt-5'}>
      <View className={'items-center'}>
        <View className={'w-32 h-32'}>
          <Image style={{borderColor: '#6842FF', borderWidth: 2}} source={user.photo} resizeMode="cover" className={'flex-1 rounded-full'}/>
        </View>
        <Text className={'font-bold text-3xl text-center w-screen pt-2 text-white'}>{user.name}</Text>
      </View>
      <View className={'mx-4'}>
        <View className={'my-6 py-4 bg-white rounded-2xl'}>
          <View className={'flex-row px-5'}>
            <Text style={{borderColor: '#BCB3E2', borderWidth: 5}} className={'font-bold my-auto bg-primary pt-[10px] text-center rounded-full text-xl w-[50px] h-[50px] text-white'}>1</Text>
            <View className={'w-full px-4'}>
              <View className={'flex-row justify-between pr-8'}>
                <Text className={'font-semibold text-xl'}>Уровень {Math.floor(user.exp / 100)}</Text>
                <Text className={'my-auto opacity-50 font-semibold'}>{user.exp % 100} / 100</Text>
              </View>
              <Text className={'opacity-50'}>До {Math.floor(user.exp / 100) + 1} уровня {100 - user.exp % 100} очков</Text>
            </View>
          </View>
        </View>
        <View className={'flex-row justify-between mb-5'}>
          <Text className={'text-xl text-white'}>Мои тренировки</Text>
          <Text className={'my-auto text-primary'}>Перейти -></Text>
        </View>
        <ProgramList/>
      </View>
    </View>
  )
}

export default ProfileScreen