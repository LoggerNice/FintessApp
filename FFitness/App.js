import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import Stack from "./app/navigation/Stack";

export default function App() {
  return (
    <View className='h-screen w-screen'>
      <Stack/>
      <StatusBar style="auto" />
    </View>
  )
}
