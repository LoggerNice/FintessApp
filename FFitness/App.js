import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import Stack from "./app/navigation/Stack";

export default function App() {
  return (
    <View className='h-screen w-screen'>
        <Stack/>
      <StatusBar style="dark" />
    </View>
  )
}
