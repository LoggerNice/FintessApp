import Login from "../screens/auth/Login"
import HomeScreen from "../screens/main/HomeScreen"
import Registration from "../screens/auth/Registration"
import ExercisesScreen from "../screens/browse/ExercisesScreen"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import EditScreen from "../screens/profile/EditScreen"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MedForm from "../screens/form/MedForm"
import EditMedForm from "../screens/form/EditMedForm"
import UserList from "../screens/profile/UserList"
import darkTheme from "@react-navigation/native/src/theming/DarkTheme"
import Navigation from "./Navigation"
import ExerciseDetail from "../screens/browse/ExerciseDetail"
import PostsList from "../screens/main/posts/PostsList"
import PostDetails from "../screens/main/posts/PostDetails"
import TreningDay from "../screens/trening/TrainingDay"
import NavigationMed from "./NavigationMed"
import ProfileUser from "../screens/profile/ProfileUser"
import PostsFull from "../screens/main/posts/PostFull"
import Instruction from "../screens/auth/Instruction"
import AddNewElement from "../screens/browse/AddNewElement"
import EditElement from "../screens/browse/EditElement"
import EditDay from "../screens/trening/EditDay"

darkTheme.colors.background = '#181A20';
const RootStack = createNativeStackNavigator()

function Stack() {
  return (
      <RootStack.Navigator screenOptions={{headerShown:false}}>
        <RootStack.Screen name='Login' component={Login}/>
        <RootStack.Screen name='Registration' component={Registration}/>
        <RootStack.Screen name='Navigation' component={Navigation}/>
        <RootStack.Screen name='NavigationMed' component={NavigationMed}/>
        <RootStack.Screen name='Instruction' component={Instruction}/>
        <RootStack.Screen name='Home' component={HomeScreen}/>
        <RootStack.Screen name='Browse' component={ExercisesScreen}/>
        <RootStack.Screen name='EditDay' component={EditDay}/>
        <RootStack.Screen name='Add' component={AddNewElement}/>
        <RootStack.Screen name='Edit' component={EditElement}/>
        <RootStack.Screen name='Exercise' component={ExerciseDetail}/>
        <RootStack.Screen name='Posts' component={PostsList}/>
        <RootStack.Screen name='PostsFull' component={PostsFull}/>
        <RootStack.Screen name='Post' component={PostDetails}/>
        <RootStack.Screen name='Trening' component={TreningScreen}/>
        <RootStack.Screen name='DayTrening' component={TreningDay}/>
        <RootStack.Screen name='Profile' component={ProfileScreen}/>
        <RootStack.Screen name='ProfileUser' component={ProfileUser}/>
        <RootStack.Screen name='EditProfile' component={EditScreen}/>
        <RootStack.Screen name='MedForm' component={MedForm}/>
        <RootStack.Screen name='EditMed' component={EditMedForm}/>
        <RootStack.Screen name='UserList' component={UserList}/>
      </RootStack.Navigator>
  )
}

export default Stack