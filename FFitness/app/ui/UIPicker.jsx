import React, {useEffect, useState} from 'react'
import {Picker} from '@react-native-picker/picker'
import {View, Text} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

const UIPicker = ({ options, title, onChange, index }) => {
  const [selectedValue, setSelectedValue] = useState(options[0])

  useEffect(() => {
    const fetchData = async () => {
      setSelectedValue(options[index])
    }
    fetchData()
  }, [selectedValue])

  const handleValueChange = (itemValue, itemIndex) => {
    setSelectedValue(itemValue)
    onChange(itemValue)
  }

  return (
    <View className={'bg-input border-0 rounded-xl py-2 px-3 mb-5'}>
      <Text className={'text-white opacity-50 pt-3 px-2'}>{title}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        mode={'dropdown'}
        dropdownIconColor={'rgba(255,255,255,0.5)'}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} color={'white'} style={{backgroundColor: '#1F222A'}}/>
        ))}
      </Picker>
    </View>
  )
}

export default UIPicker