import React, { useState } from 'react'
import {Image, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import UIButton from "./UIButton"

const UIPickerImage = ({onChange}) => {
  const [imageUri, setImageUri] = useState(null)

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
      onChange(result.assets[0].uri)
    }
  }

  return (
    <View className={'mb-5'}>
      {imageUri && (<Image source={{ uri: imageUri }} />)}
      <UIButton title="Загрузить фото справки" onPress={handleChoosePhoto} />
    </View>
  )
}

export default UIPickerImage