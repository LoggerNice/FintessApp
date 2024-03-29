import {ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import useFetch from "../../../model/UseFetch"
import {URLA} from "../../../../axios"
import UILike from "../../../ui/UILike"
import React, {useEffect, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Ionicons} from "@expo/vector-icons"

export const getFav = (favorites) => {
  return favorites
}

const PostsFull = () => {
  const navigation = useNavigation()
  const url = `${URLA}/posts`
  const {data, isLoading} = useFetch(url)
  const [role, setRole] = useState('')
  const [isLikes, setIsLikes] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [favorites, setFavorites] = useState([])
  getFav(favorites)

  useEffect(() => {
    const fetchData = async () => {
      const _role = await AsyncStorage.getItem('role')
      setRole(_role)
    }

    fetchData()
  }, [role])

  const handleLikes = () => {
    setIsLikes(prevState => !prevState)
    setSearchResults(favorites)
  }

  const addToFavorites = (post) => {
    const isFavorite = favorites.some((favPost) => favPost._id === post._id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((favPost) => favPost._id !== post._id);
      setFavorites(updatedFavorites)
    } else {
      setFavorites([...favorites, post])
    }
  }


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
        <View className={'flex flex-row justify-between mt-5 mb-6'}>
          <TouchableOpacity onPress={() => isLikes ? setIsLikes(prevState => !prevState) : navigation.goBack()} className={'flex flex-row items-center'}>
            <Ionicons name="arrow-back" size={30} color="white" backgroundColor='null'/>
            <Text className={'font-semibold text-xl text-white pl-2'}>Назад</Text>
          </TouchableOpacity>
          <TouchableOpacity className={'ml-4'} onPress={() => {handleLikes()}}>
            <Ionicons name={"heart-sharp"} size={30} color="white" backgroundColor='none'/>
          </TouchableOpacity>
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
          {isLikes ?
            searchResults.map(post =>
              <TouchableHighlight key={post._id} onPress={() => navigation.navigate('Post', {id: post._id, role: role})}>
                <View className={'bg-primary rounded-2xl px-4 py-3 h-32 w-full justify-between'}>
                  <Text className={'text-xl font-bold text-white pb-1'}>{post.title}</Text>
                  <View className={'flex-row justify-between items-center'}>
                    <Text className={'text-white text-[16px]'}>{post.type}</Text>
                    <UILike onPress={() => addToFavorites(post)} isLikes={favorites.includes(post)}/>
                  </View>
                </View>
              </TouchableHighlight>
            )
            :
            data.post.map(post =>
              <TouchableHighlight key={post._id} onPress={() => navigation.navigate('Post', {id: post._id, role: role})}>
                <View className={'bg-primary rounded-2xl px-4 py-3 h-32 w-full justify-between'}>
                  <Text className={'text-xl font-bold text-white pb-1'}>{post.title}</Text>
                  <View className={'flex-row justify-between items-center'}>
                    <Text className={'text-white text-[16px]'}>{post.type}</Text>
                    {role === 'user' && <UILike onPress={() => addToFavorites(post)} isLikes={favorites.includes(post)}/>}
                  </View>
                </View>
              </TouchableHighlight>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default PostsFull