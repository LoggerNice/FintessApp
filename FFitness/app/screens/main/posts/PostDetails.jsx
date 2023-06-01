import {URLA} from "../../../../axios"
import useFetch from "../../../model/UseFetch"
import {Image, ScrollView, Text, View} from "react-native"
import UIHeader from "../../../ui/UIHeader"

const PostDetails = ({route}) => {
  const isNews = true
  const { id, role } = route.params
  const url = `${URLA}/posts/${id}`
  const {data, isLoading} = useFetch(url)

  if(!isLoading) {
    return (
      <View className={'items-center'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mt-5 h-full'}>
      <View className={'mb-6 mx-4'}>
        <UIHeader role={role} isNews={isNews} data={data}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className={'flex-1'}>
        {data.post.imageURL && <Image source={{uri: data.post.imageURL}} resizeMode='cover' className={'w-full h-96 rounded-lg mb-4'}/>}
        <View className={'mx-4 mb-10'}>
          <Text className={'text-white font-bold text-3xl'}>{data.post.title}</Text>
          <View className={'bg-white h-[1px] my-5'}/>
          <Text className={'text-white text-[15px] mb-5'}>{data.post.text}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default PostDetails