import {ScrollView, Text, TouchableHighlight, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import useFetch from "../../../model/UseFetch"
import {URLA} from "../../../../axios"
import UILike from "../../../ui/UILike"
import React from "react"
import UIHeader from "../../../ui/UIHeader"

const PostsFull = () => {
  const navigation = useNavigation()
  const url = `${URLA}/posts`
  const {data, isLoading} = useFetch(url)

  if(!isLoading) {
    return (
      <View className={'items-center'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mx-4 h-full'}>
      <View className={'my-5'}>
        <UIHeader/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'flex-col space-y-3 mb-10'}>
          {data.post.map(post =>
            <TouchableHighlight key={post._id} onPress={() => navigation.navigate('Post', {id: post._id})}>
              <View className={'bg-primary rounded-2xl px-4 py-3 h-32 w-full justify-between'}>
                <Text className={'text-xl font-bold text-white pb-1'}>{post.title}</Text>
                <View className={'flex-row justify-between items-center'}>
                  <Text className={'text-white text-[16px]'}>{post.type}</Text>
                  <UILike/>
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