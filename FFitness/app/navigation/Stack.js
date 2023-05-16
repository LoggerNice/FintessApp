import Login from "../screens/auth/Login"
import HomeScreen from "../screens/main/HomeScreen"
import Registration from "../screens/auth/Registration"
import BrowseScreen from "../screens/browse/BrowseScreen"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import EditScreen from "../screens/profile/EditScreen"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MedForm from "../screens/form/MedForm"
import EditMedForm from "../screens/form/EditMedForm"
import ProgramListDays from "../screens/trening/ProgramListDays"
import UserList from "../screens/profile/UserList"
import darkTheme from "@react-navigation/native/src/theming/DarkTheme"

darkTheme.colors.background = '#181A20';
const StackN = createNativeStackNavigator()
function Stack() {
  return (
      <StackN.Navigator screenOptions={{headerShown:false}}>
        <StackN.Screen name='Login' component={Login}/>
        <StackN.Screen name='Registration' component={Registration}/>
        <StackN.Screen name='Home' component={HomeScreen}/>
        <StackN.Screen name='Browse' component={BrowseScreen}/>
        <StackN.Screen name='Trening' component={TreningScreen}/>
        <StackN.Screen name='Profile' component={ProfileScreen}/>
        <StackN.Screen name='Program' component={ProgramListDays}/>
        <StackN.Screen name='EditProfile' component={EditScreen}/>
        <StackN.Screen name='MedForm' component={MedForm}/>
        <StackN.Screen name='EditMed' component={EditMedForm}/>
        <StackN.Screen name='UserList' component={UserList}/>
      </StackN.Navigator>
  )
}

export default Stack