import {Image, ScrollView, Text, View} from "react-native"
import {useState} from "react"
import {useNavigation} from "@react-navigation/native"
import axios from "axios"
import UIButton from "../../ui/UIButton"

const ProgramList = () => {
    const navigation = useNavigation()
    const image = { uri: "https://recordregion.ru/wp-content/uploads/2/8/a/28a632680cffcb6eb240cfc4a07d0225.jpeg" }
    const [training, setTraining] = useState({type: 'Кардио', count: 5})

    return (
      <ScrollView horizontal={true}>
        <View className={'flex-row space-x-6'}>
            <View className={'relative w-[300px] h-[300px]'}>
                <Image source={image} resizeMode="cover" className={'flex-1 opacity-50 rounded-2xl'}/>
                <View className={'pl-[40px] pb-[30px] absolute bottom-0 left-0'}>
                    <Text className={'font-semibold text-[22px] text-white pb-1'}>Первый день</Text>
                    <View className={'flex-row '}>
                        <Text className={'text-txt'}>{training.count} упражнений</Text>
                        <Text className={'text-txt px-5'}>|</Text>
                        <Text className={'text-txt'}>{training.type}</Text>
                    </View>
                </View>
            </View>

            <View className={'relative w-[300px] h-[300px]'}>
                <Image source={image} resizeMode="cover" className={'flex-1 opacity-50 rounded-2xl'}/>
                <View className={'pl-[40px] pb-[30px] absolute bottom-0 left-0'}>
                    <Text className={'font-semibold text-[22px] text-white pb-1'}>Первый день</Text>
                    <View className={'flex-row '}>
                        <Text className={'text-txt'}>{training.count} упражнений</Text>
                        <Text className={'text-txt px-5'}>|</Text>
                        <Text className={'text-txt'}>{training.type}</Text>
                    </View>
                </View>
            </View>
        </View>
      </ScrollView>
    )
}

export default ProgramList