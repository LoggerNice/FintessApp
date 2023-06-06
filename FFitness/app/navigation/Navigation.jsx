import {Text, TouchableOpacity, StyleSheet} from "react-native"
import React, {useEffect} from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/main/HomeScreen"
import ExercisesScreen from "../screens/browse/ExercisesScreen"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import Icon, {Icons} from "../ui/Icons"
import Login from "../screens/auth/Login";
import Registration from "../screens/auth/Registration";
import NavigationMed from "./NavigationMed";
import Instruction from "../screens/auth/Instruction";
import EditDay from "../screens/trening/EditDay";
import AddNewElement from "../screens/browse/AddNewElement";
import EditElement from "../screens/browse/EditElement";
import ExerciseDetail from "../screens/browse/ExerciseDetail";
import PostsList from "../screens/main/posts/PostsList";
import PostsFull from "../screens/main/posts/PostFull";
import PostDetails from "../screens/main/posts/PostDetails";
import TreningDay from "../screens/trening/TrainingDay";
import ProfileUser from "../screens/profile/ProfileUser";
import EditScreen from "../screens/profile/EditScreen";
import MedForm from "../screens/form/MedForm";
import EditMedForm from "../screens/form/EditMedForm";
import UserList from "../screens/profile/UserList";

const TabArr = [
  { route: 'Home', label: 'Главная', type: Icons.Ionicons, activeIcon: 'home', component: HomeScreen },
  { route: 'Browse', label: 'Упражнения', type: Icons.Ionicons, activeIcon: 'ios-compass', component: ExercisesScreen },
  { route: 'Trening', label: 'Тренировки', type: Icons.MaterialIcons, activeIcon: 'fitness-center', component: TreningScreen },
  { route: 'Profile', label: 'Профиль', type: Icons.FontAwesome, activeIcon: 'user', component: ProfileScreen },
]
const Tab = createBottomTabNavigator()

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
        <Icon type={item.type} name={item.activeIcon} color={focused ? '#6842FF' : 'rgba(255,255,255,0.5)'} />
        <Text className={focused ? 'text-primary pt-1' : 'text-txt pt-1'}>{item.label}</Text>
    </TouchableOpacity>
  )
}

function Navigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: styles.tabBar}}>
      <Tab.Screen name={'Home'} label='Hello' component={HomeScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[0]} />
      }}/>
      <Tab.Screen name={'Browse'} component={ExercisesScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[1]} />
      }}/>
      <Tab.Screen name={'Trening'} component={TreningScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[2]} />
      }}/>
      <Tab.Screen name={'Profile'} component={ProfileScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[3]} />
      }}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24
  },
  tabBar: {
    height: 80,
    borderRadius: 16
  }
})

export default Navigation