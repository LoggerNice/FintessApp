import {View, Text, TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import UILike from "./UILike"
import React from "react"

const UIHeader = ({role, isNews, data}) => {
  const navigation = useNavigation()

  return (
      <View className={'flex flex-row justify-between items-center'}>
        <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center'}>
          <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
        </TouchableOpacity>
        <View className={'flex flex-row'}>
          {role === 'moderator' ?
            <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate('Edit', {isNews: isNews, data: data})}>
              <MaterialIcons name={"edit"} size={30} color="white" backgroundColor='none'/>
            </TouchableOpacity>
            :
            <UILike/>
          }
        </View>
      </View>
  )
}

export default UIHeader