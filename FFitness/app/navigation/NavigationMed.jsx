import {Text, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import ExercisesScreen from "../screens/browse/ExercisesScreen"
import TreningScreen from "../screens/trening/TreningScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import Icon, {Icons} from "../ui/Icons"
import UserList from "../screens/profile/UserList"

const TabArr = [
  { route: 'UserList', label: 'Клиенты', type: Icons.Ionicons, activeIcon: 'home', component: UserList },
  { route: 'Trening', label: 'Тренировки', type: Icons.MaterialIcons, activeIcon: 'fitness-center', component: TreningScreen },
  { route: 'Profile', label: 'Профиль', type: Icons.FontAwesome, activeIcon: 'user', component: ProfileScreen },
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
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: styles.tabBar}}>
      <Tab.Screen name={'Home'} label='Hello' component={UserList} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[0]} />
      }}/>
      <Tab.Screen name={'Trening'} component={TreningScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[1]} />
      }}/>
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