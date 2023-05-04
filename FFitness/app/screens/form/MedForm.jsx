import {Text, TouchableOpacity, View} from "react-native"
import React from "react"
import UIButton from "../../ui/UIButton"
import {useNavigation} from "@react-navigation/native"
import useMedForm from "../../model/MedForm"

const MedForm = () => {
  const navigation = useNavigation()
  const {form, isLoadingForm} = useMedForm()

  return (
    <View className={'my-6 px-5 py-4 bg-white rounded-2xl space-y-3'}>
      <View className={'flex-row justify-between py-2'}>
        <Text className={'text-[22px] text-second font-bold'}>Медицинская анкета</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditMed')}>
          <Text className={'my-auto text-primary'}>Перейти -></Text>
        </TouchableOpacity>
      </View>
      {isLoadingForm ?
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
          <UIButton title={'Заполните анкету'} onPress={() => navigation.navigate('EditMed')}/>
        </View>
      }
    </View>
  )
}

export default MedForm