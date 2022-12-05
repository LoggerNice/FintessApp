import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

import ProfileScreen from "./app/screens/profile/ProfileScreen";

export default function App() {
  return (
    <View className='mx-auto mt-12'>
      <ProfileScreen />
      <StatusBar style="auto" />
    </View>
  );
}
