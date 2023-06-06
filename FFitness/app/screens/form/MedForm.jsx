import {Text, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import React from "react"

import {URLA} from "../../../axios"
import UIButton from "../../ui/UIButton"
import useFetch from "../../model/UseFetch"

const MedForm = ({userID, role}) => {
  const navigation = useNavigation()
  const url = `${URLA}/medical/${userID}`
  const {data: {form}, isLoading} = useFetch(url)

  return (
    <View className={'my-6 px-5 py-4 bg-input rounded-2xl space-y-3'}>
      <View className={'flex-row justify-between py-2'}>
        <Text className={'text-[22px] text-black font-bold'}>Медицинская анкета</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditMed', {form, userID, role})}>
          <Text className={'my-auto text-primary'}>Перейти ➔</Text>
        </TouchableOpacity>
      </View>
      {isLoading ?
        <View className={'space-y-2.5'}>
          <View className={'border-primary border-t-[1px] pt-4'}>
            <Text className={'opacity-50'}>Вас возраст</Text>
            <Text className={'font-semibold text-lg'}>{form.age}</Text>
          </View>
          <View>
            <Text className={'opacity-50'}>Ваш рост</Text>
            <Text className={'font-semibold text-lg'}>{form.weight}</Text>
          </View>
          <View>
            <Text className={'opacity-50'}>Ваш вес</Text>
            <Text className={'font-semibold text-lg'}>{form.height}</Text>
          </View>
          <View>
            <Text className={'opacity-50'}>Доступ к тренировкам</Text>
            <Text className={'font-semibold text-lg'}>{form.access ? 'Разрешен' : 'Запрещен'}</Text>
          </View>
          <View>
            <Text className={'opacity-50'}>Заболевания</Text>
            <Text className={'font-semibold text-lg'}>{form.desease.length > 0 ? 'Имеются' : 'Отсутствуют'}</Text>
          </View>
        </View>
        :
        <View>
          <UIButton title={'Заполните анкету'} onPress={() => navigation.navigate('EditMed', {form, userID})}/>
        </View>
      }
    </View>
  )
}

export default MedForm