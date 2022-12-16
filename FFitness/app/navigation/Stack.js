import Login from "../screens/auth/Login"
import HomeScreen from "../screens/main/HomeScreen"
import Registration from "../screens/auth/Registration"
import BrowseScreen from "../screens/browse/BrowseScreen"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import darkTheme from "@react-navigation/native/src/theming/DarkTheme"
darkTheme.colors.background = '#181A20';

const StackN = createNativeStackNavigator()

function Stack() {
  return (
    <NavigationContainer theme={darkTheme}>
      <StackN.Navigator>
        <StackN.Screen name='Login' component={Login}/>
        <StackN.Screen name='Registration' component={Registration}/>
        <StackN.Screen name='Home' component={HomeScreen}/>
        <StackN.Screen name='Browse' component={BrowseScreen}/>
        <StackN.Screen name='Trening' component={TreningScreen}/>
        <StackN.Screen name='Profile' component={ProfileScreen}/>
      </StackN.Navigator>
    </NavigationContainer>
  )

}

export default Stack