import {ScrollView, Text, TouchableHighlight, View} from "react-native"
import {useNavigation} from "@react-navigation/native"
import useFetch from "../../../model/UseFetch"
import {URLA} from "../../../../axios"
import UILike from "../../../ui/UILike"
import React from "react"

const PostsList = ({isHorizontal}) => {
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
    <ScrollView horizontal={isHorizontal} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View className={'flex-row space-x-3'}>
      {data.post.map((post, index) =>
       index < 5 &&
        <TouchableHighlight key={post._id} onPress={() => navigation.navigate('Post', {id: post._id})}>
          <View className={'bg-primary rounded-2xl px-4 py-3 h-32 max-w-[330px] justify-between'}>
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
  )
}

export default PostsList