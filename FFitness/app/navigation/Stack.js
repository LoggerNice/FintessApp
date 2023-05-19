import Login from "../screens/auth/Login"
import HomeScreen from "../screens/main/HomeScreen"
import Registration from "../screens/auth/Registration"
import BrowseScreen from "../screens/browse/BrowseScreen"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import EditScreen from "../screens/profile/EditScreen"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MedForm from "../screens/form/MedForm"
import EditMedForm from "../screens/form/EditMedForm"
import UserList from "../screens/profile/UserList"
import darkTheme from "@react-navigation/native/src/theming/DarkTheme"
import Navigation from "./Navigation"

darkTheme.colors.background = '#181A20';
const RootStack = createNativeStackNavigator()

function Stack() {
  return (
      <RootStack.Navigator screenOptions={{headerShown:false}}>
        <RootStack.Screen name='Navigation' component={Navigation}/>
        <RootStack.Screen name='Login' component={Login}/>
        <RootStack.Screen name='Registration' component={Registration}/>
        <RootStack.Screen name='Home' component={HomeScreen}/>
        <RootStack.Screen name='Browse' component={BrowseScreen}/>
        <RootStack.Screen name='Trening' component={TreningScreen}/>
        <RootStack.Screen name='Profile' component={ProfileScreen}/>
        <RootStack.Screen name='EditProfile' component={EditScreen}/>
        <RootStack.Screen name='MedForm' component={MedForm}/>
        <RootStack.Screen name='EditMed' component={EditMedForm}/>
        <RootStack.Screen name='UserList' component={UserList}/>
      </RootStack.Navigator>
  )
}

export default Stack