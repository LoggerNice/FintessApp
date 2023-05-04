import {View, Text} from "react-native"
import {useEffect, useState} from "react"
import { MaterialIcons } from '@expo/vector-icons'

import UIField from "./UIField"
import AsyncStorage from "@react-native-async-storage/async-storage";
import useMedForm from "../model/MedForm";

const UIAddList = ({onChange}) => {
  const [disease, setDisease] = useState('')
  const [diseasesList, setDiseasesList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const desease = await AsyncStorage.getItem('desease')
      setDiseasesList(JSON.parse(desease))
    }
    fetchData()
  }, [])

  const handleAddDisease = () => {
    if (disease.trim() === '') return
    setDiseasesList([...diseasesList, disease.trim()])
    setDisease('')
    onChange(diseasesList)
  }

  const handleRemDisease = (index) => {
    setDiseasesList(prevList => {
      const newList = [...prevList]
      newList.splice(index, 1)
      return newList
    })
    onChange(diseasesList)
  }

  return (
    <View className={'pt-3 mb-[20px] border-0 rounded-xl bg-input text-white'}>
      <Text className={'text-white opacity-50 pb-3 pl-5'}>Заболевания</Text>
      {diseasesList.length > 0 ? diseasesList.map((disease, index) => (
        <View className={'flex-row justify-between pl-5 pr-1 items-center'}>
          <Text key={index} className={'text-white'}>{disease}</Text>
          <MaterialIcons.Button name="delete" size={30} color="white" onPress={() => handleRemDisease(index)} backgroundColor='null'/>
        </View>
      )) : <Text className={'text-white pl-5'}>Пусто</Text>}
      <View className={'flex-row justify-between pr-1 items-center border-t-2 border-[#181A20] mt-3'}>
        <View className={'pt-4'}>
          <UIField placeholder={'Название заболевания'} value={disease} onChange={(value) => setDisease(value)}/>
        </View>
        <MaterialIcons.Button name="add-circle" size={30} color="white" onPress={handleAddDisease} backgroundColor='null'/>
      </View>
    </View>
  )
}

export default UIAddList