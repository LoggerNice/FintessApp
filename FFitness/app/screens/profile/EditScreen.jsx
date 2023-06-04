import {Alert, Image, Text, ToastAndroid, TouchableOpacity, View} from "react-native"
import {Entypo, Ionicons} from "@expo/vector-icons"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"
import React, {useEffect, useState} from "react"
import {useNavigation} from "@react-navigation/native"
import axios from "axios"
import {URLA} from "../../../axios"
import * as ImagePicker from "expo-image-picker"

const EditScreen = ({ route }) => {
  const navigation = useNavigation()
  const {user: data} = route.params
  const [user, setUser] = useState(data)
  const [galleryPermission, setGalleryPermission] = useState(null)

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync()
    setGalleryPermission(imagePermission.status === 'granted')
  }

  useEffect(() => {
    permisionFunction()
  }, [])

  const pickHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.cancelled) {
      setUser({...user, photo: result.uri})
    }
  }

  const editHandler = async () => {
    const data = {name: user.name, avatarURL: user.photo}
    const res = await axios.patch(`${URLA}/profile/${user.id}`, {data})
    if (res) {
      Alert.alert('Данные успешно изменены!')
    } else {
      Alert.alert('Ошибка при изменении!')
    }
  }

  return (
    <View className={'mt-5 mx-4'}>
      <TouchableOpacity onPress={() => navigation.goBack()} className={'flex flex-row items-center mb-6'}>
        <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
        <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
      </TouchableOpacity>
      <View className={'mt-5 mb-6'}>
        <View className={'items-center'}>
          <View className={'w-36 h-36 relative'}>
            <Image style={{borderColor: '#6842FF', borderWidth: 2}} source={{uri: user.photo}} resizeMode="cover" className={'flex-1 rounded-full w-full h-full'}/>
            <TouchableOpacity onPress={pickHandler} className={'absolute bottom-0 right-0'}>
              <Entypo name="edit" size={30} color='#6842FF' style={{backgroundColor: 'white' , borderColor: '#6842FF', borderWidth: 2, width: 50, height: 50, borderRadius: 25, textAlignVertical: 'center', textAlign: 'center'}}/>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-white my-2 opacity-50 text-center">Фотография</Text>
        <Text className="text-white mb-2 mt-4 ml-4 opacity-50">Ваше имя</Text>
        <UIField placeholder={'Андрей...'} value={user.name} onChange={value => setUser({...user, name: value})}/>
      </View>
      <UIButton title={'Изменить'} onPress={editHandler}/>
    </View>
  )
}

export default EditScreen