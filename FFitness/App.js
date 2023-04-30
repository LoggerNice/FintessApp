import {StatusBar, View} from 'react-native'
import Stack from "./app/navigation/Stack";

export default function App() {
  return (
    <View className={`w-screen h-screen pt-[${StatusBar.currentHeight}]`}>
      <StatusBar backgroundColor={'#181A20'}/>
      <Stack/>
    </View>
  )
}
