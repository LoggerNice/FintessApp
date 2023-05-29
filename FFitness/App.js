import {StatusBar, View} from 'react-native'
import Stack from "./app/navigation/Stack"
import {NavigationContainer} from "@react-navigation/native"
import darkTheme from "@react-navigation/native/src/theming/DarkTheme"

export default function App() {
  darkTheme.colors.background = '#181A20'

  return (
    <View className={`w-screen h-screen pt-[${StatusBar.currentHeight}] bg-second`}>
      <StatusBar backgroundColor={'#181A20'}/>
      <NavigationContainer theme={darkTheme}>
        <Stack/>
      </NavigationContainer>
    </View>
  )
}
