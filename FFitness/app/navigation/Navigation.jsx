import { NavigationContainer } from 'react-navigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from "../screens/main/HomeScreen"
import ProfileScreen from "../screens/profile/ProfileScreen";
import TreningScreen from "../screens/trening/TreningScreen";
import BrowseScreen from "../screens/browse/BrowseScreen";

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='BrowseScreen' component={BrowseScreen}/>
        <Stack.Screen name='TreningScreen' component={TreningScreen}/>
        <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation