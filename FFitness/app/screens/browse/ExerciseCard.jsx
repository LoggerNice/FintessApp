import {Image, Modal, Text, View} from "react-native"
import UILike from "../../ui/UILike"
import UIAdd from "../../ui/UIAdd"
import React, {useState} from "react"
import {useNavigation} from "@react-navigation/native"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"
import {getUserStorage} from "../../model/Storage"
import axios from "axios"
import {URLA} from "../../../axios"

const ExerciseCard = ({exercise, role, onPress, isLikes, trening, idx}) => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')

  const addHandle = () => {
    setModalVisible(true)
  }

  const saveHandle = async () => {
    setModalVisible(false)

    const nameDay = trening[idx][0].nameDay
    if (!trening[idx][0].name) {
      trening[idx].splice(0, 1)
    }

    trening[idx].push({...exercise, sets: sets, repetitions: reps, nameDay: nameDay})

    const {id} = await getUserStorage()
    const data = {training: trening}
    await axios.patch(`${URLA}/program/${id}`, {data})

    return navigation.navigate('DayTrening', {trening, idx})
  }

  return (
    <View>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide" transparent={true}>
        <View className={'my-auto px-4 pb-10 rounded-2xl bg-second border-primary border-[1px]'}>
          <Text className={'text-2xl font-bold text-white text-center my-8'}>Настройте упражнение</Text>
          <UIField
            placeholder="Количество подходов"
            value={sets}
            onChange={text => setSets(text)}
          />
          <UIField
            placeholder="Количество выполнений"
            value={reps}
            onChange={text => setReps(text)}
          />
          <View className={'mt-3'}>
            <UIButton title="Сохранить" onPress={saveHandle} />
          </View>
        </View>
      </Modal>
      <View className={'relative w-[175px] h-[230px] mb-3'}>
        <Image source={{uri: exercise.photo}} blurRadius={3} resizeMode='cover' className={'flex-1 opacity-50 rounded-2xl'}/>
        {role === 'user' && <View className={'flex-row justify-between absolute pt-[15px] pr-4 w-full'}>
          <UILike onPress={onPress} isLikes={isLikes}/>
          <UIAdd onPress={addHandle}/>
        </View>}
        <View className={'pl-[20px] pb-[25px] absolute bottom-0 left-0'}>
          <Text className={'font-bold text-[18px] text-white pb-1'}>{exercise.name}</Text>
          <Text className={'text-white text-sm opacity-80'}>{exercise.difficulty === 'Начинающий' ? 'Лёгкий': exercise.difficulty} уровень</Text>
        </View>
      </View>
    </View>
  )
}

export default ExerciseCard