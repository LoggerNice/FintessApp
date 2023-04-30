import React, { useState } from 'react'
import {Image, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import UIButton from "./UIButton"

const UIPickerImage = ({onChange}) => {
  const [imageUri, setImageUri] = useState(null)

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    })

    if (!result.cancelled) {
      setImageUri(result.uri)
      onChange(imageUri)
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