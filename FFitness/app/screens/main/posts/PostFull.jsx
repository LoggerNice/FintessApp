import {ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import useFetch from "../../../model/UseFetch"
import {URLA} from "../../../../axios"
import UILike from "../../../ui/UILike"
import React, {useEffect, useState} from "react"
import UIHeader from "../../../ui/UIHeader"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Ionicons} from "@expo/vector-icons"

const PostsFull = () => {
  const navigation = useNavigation()
  const url = `${URLA}/posts`
  const {data, isLoading} = useFetch(url)
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const _role = await AsyncStorage.getItem('role')
      setRole(_role)
    }

    fetchData()
  }, [role])

  if(!isLoading) {
    return (
      <View className={'items-center'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mx-4 h-full'}>
      {role === 'user' ?
        <View className={'my-5'}>
          <UIHeader/>
        </View>
        :
        <View className={'mt-5 mb-6 flex flex-row justify-between items-center'}>
          <View className={'flex-row items-center'}>
            <Ionicons name="list" size={30} color="white" backgroundColor='null'/>
            <Text className={'font-semibold text-xl text-white pl-3'}>Новости</Text>
          </View>
          <View className={'flex flex-row'}>
            <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate('Add', {isNews: true})}>
              <Ionicons name={"add-circle"} size={30} color="white" backgroundColor='none'/>
            </TouchableOpacity>
          </View>
        </View>
      }
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'flex-col space-y-3 mb-10'}>
          {data.post.map(post =>
            <TouchableHighlight key={post._id} onPress={() => navigation.navigate('Post', {id: post._id, role: role})}>
              <View className={'bg-primary rounded-2xl px-4 py-3 h-32 w-full justify-between'}>
                <Text className={'text-xl font-bold text-white pb-1'}>{post.title}</Text>
                <View className={'flex-row justify-between items-center'}>
                  <Text className={'text-white text-[16px]'}>{post.type}</Text>
                  {role === 'user' && <UILike/>}
                </View>
              </View>
            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default PostsFull