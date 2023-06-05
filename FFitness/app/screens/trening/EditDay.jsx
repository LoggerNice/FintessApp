import {Alert, KeyboardAvoidingView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native"
import React, {useState} from "react"
import {useNavigation} from "@react-navigation/native"
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import UIButton from "../../ui/UIButton"
import UIField from "../../ui/UIField"
import axios from "axios";
import {URLA} from "../../../axios";
import {getUserStorage} from "../../model/Storage";

const EditDay = ({ route }) => {
  const navigation = useNavigation()
  const {trening, idx} = route.params
  const [program, setProgram] = useState(trening)

  const saveHandler = async () => {
    const {id} = await getUserStorage()
    const data = {training: program}
    await axios.patch(`${URLA}/program/${id}`, {data})
  }
  const deleteHandler = (index) => {
    if (program[idx].length >= 3) {
      setProgram(prevList => {
        const newList = [...prevList]
        newList[idx].splice(index, 1)
        return newList
      })
    } else {
      Alert.alert('Ошибка', 'В программе должно быть не менее 2х упражнений')
    }
  }

  return (
    <KeyboardAvoidingView className={'mx-4 mb-6'} behavior="padding" enabled>
      <View className={'my-5 flex flex-row justify-between items-center'}>
        <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center'}>
          <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
          <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'flex-col space-y-3 w-full h-full mb-24'}>
          {program[idx]?.map((exercise, index) =>
            <View key={exercise._id}>
              <View className={''}>
                <View className={'flex-row justify-between'}>
                  <Text className={'font-bold text-2xl text-white mb-2'}>{exercise.name}</Text>
                  <TouchableHighlight onPress={() => deleteHandler(index)}>
                    <MaterialIcons  name="delete" size={30} color="white" backgroundColor='null'/>
                  </TouchableHighlight>
                </View>
                <View>
                  <Text className={'text-white mb-1'}>Количество подходов</Text>
                  <UIField placeholder={'Подходы'}
                           value={exercise.sets.toString()}
                           onChange={value => setProgram(prevProgram => {
                             const updatedProgram = [...prevProgram]
                             updatedProgram[idx] = updatedProgram[idx].map(item => {
                               if (item._id === exercise._id) {
                                 return { ...item, sets: Number(value) }
                               }
                               return item
                             })
                             return updatedProgram
                           })}/>
                </View>
                <View>
                  <Text className={'text-white mb-1'}>Количество выполнений</Text>
                  <UIField placeholder={'Выполнения'}
                           value={exercise.repetitions.toString()}
                           onChange={value => setProgram(prevProgram => {
                             const updatedProgram = [...prevProgram]
                             updatedProgram[idx] = updatedProgram[idx].map(item => {
                               if (item._id === exercise._id) {
                                 return { ...item, repetitions: Number(value) }
                               }
                               return item
                             })
                             return updatedProgram
                           })}/>
                </View>
              </View>
            </View>
          )}
          <UIButton title={'Сохранить'} onPress={saveHandler}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditDay