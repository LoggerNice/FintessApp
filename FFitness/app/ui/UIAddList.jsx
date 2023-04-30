import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {useState} from "react";
import UIField from "./UIField";
import UIButton from "./UIButton";
import { MaterialIcons } from '@expo/vector-icons';

const UIAddList = () => {
  const [disease, setDisease] = useState('');
  const [diseasesList, setDiseasesList] = useState([]);

  const handleAddDisease = () => {
    if (disease.trim() === '') return
    setDiseasesList([...diseasesList, disease.trim()])
    setDisease('')
  }

  const handleRemDisease = (index) => {
    setDiseasesList(prevList => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    })
  }


  return (
    <View className={'pt-3 mb-[20px] border-0 rounded-xl bg-input text-white'}>
      <Text className={'text-white opacity-50 pb-3 pl-5'}>Заболевания</Text>
      {diseasesList.map((disease, index) => (
        <View className={'flex-row justify-between pl-5 pr-1 items-center'}>
          <Text key={index} className={'text-white'}>{disease}</Text>
          <MaterialIcons.Button name="delete" size={30} color="white" onPress={() => handleRemDisease(index)} backgroundColor='null'/>
        </View>
      ))}
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