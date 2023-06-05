import {Text, TouchableOpacity, StyleSheet} from "react-native"
import React, {useEffect, useState} from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import Icon, {Icons} from "../ui/Icons"
import UserList from "../screens/profile/UserList"
import PostFull from "../screens/main/posts/PostFull"
import ExercisesScreen from "../screens/browse/ExercisesScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TabArr = [
  { route: 'UserList', label: 'Клиенты', type: Icons.Ionicons, activeIcon: 'home', component: UserList },
  { route: 'Trening', label: 'Тренировки', type: Icons.MaterialIcons, activeIcon: 'fitness-center', component: TreningScreen },
  { route: 'Profile', label: 'Профиль', type: Icons.FontAwesome, activeIcon: 'user', component: ProfileScreen },
  { route: 'PostsFull', label: 'Новости', type: Icons.Ionicons, activeIcon: 'home', component: PostFull },
  { route: 'Browse', label: 'Упражнения', type: Icons.Ionicons, activeIcon: 'ios-compass', component: ExercisesScreen },
];
const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

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
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const _role = await AsyncStorage.getItem('role')
      setRole(_role)
    }

    fetchData()
  }, [role])

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: styles.tabBar}}>
      <Tab.Screen name={'Home'} component={role === 'moderator' ? PostFull : UserList} options={{
        tabBarButton: (props) => <TabButton {...props} item={role === 'moderator' ? TabArr[3] : TabArr[0]} />
      }}/>
      {role === 'moderator' && <Tab.Screen name={'Trening'} component={ExercisesScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[4]}/>
      }}/>}
      <Tab.Screen name={'Profile'} component={ProfileScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[2]} />
      }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24
  },
  tabBar: {
    height: 80,
    marginBottom: 20,
    borderRadius: 16
  }
})

export default Navigation