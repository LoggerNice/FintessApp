import {View, Text, TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'

import UISearch from "./UISearch"
import UILike from "./UILike"

const UIHeader = () => {
  const navigation = useNavigation()

  return (
      <View className={'flex flex-row justify-between items-center'}>
        <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center'}>
          <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
        </TouchableOpacity>
        <View className={'flex flex-row'}>
          <UILike />
        </View>
      </View>
  )
}

export default UIHeader