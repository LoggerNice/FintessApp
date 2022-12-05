import {Image, Text, View} from "react-native"

const ProfileScreen = () => {
  const lvl = 2
  const exp = 20
  const name = 'Вадим'

  return (
    <View>
      <View className={'items-center'}>
        <View className={'rounded-full w-32 h-32 border-2 border-primary'}>
          <Image className={'rounded-full w-32 h-32 bg-second m-auto'}/>
        </View>
        <Text className={'font-bold text-3xl text-center w-screen pt-2'}>{name}</Text>
      </View>
      <View className={'mx-4'}>
        <View className={'my-6 py-4 px-4 bg-primary rounded-2xl'}>
          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold text-xl text-white'}>Уровень {lvl}</Text>
            <Text className={'my-auto text-txt'}>{exp} / 100</Text>
          </View>
          <Text className={'text-txt'}>До {lvl + 1} уровня {100 - exp} очков</Text>
        </View>

        <View className={'flex-row justify-between'}>
          <Text className={'text-xl'}>Мои тренировки</Text>
          <Text className={'my-auto text-primary'}>Перейти -></Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen