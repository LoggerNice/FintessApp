import {Text, TouchableOpacity, View, StyleSheet} from "react-native"
import React, {useEffect, useRef} from "react"
import {Ionicons, MaterialIcons} from "@expo/vector-icons"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main/HomeScreen";
import BrowseScreen from "../screens/browse/BrowseScreen";
import TreningScreen from "../screens/trening/TreningScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import {Colors} from "react-native/Libraries/NewAppScreen";
import Icon, {Icons} from "../ui/Icons";

const TabArr = [
  { route: 'Home', label: 'Главная', type: Icons.Ionicons, activeIcon: 'home', component: HomeScreen },
  { route: 'Browse', label: 'Упражнения', type: Icons.Ionicons, activeIcon: 'ios-compass', component: BrowseScreen },
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
      <Tab.Screen name={'Home'} label='Hello' component={HomeScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[0]} />
      }}/>
      <Tab.Screen name={'Browse'} component={BrowseScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[1]} />
      }}/>
      <Tab.Screen name={'Trening'} component={TreningScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[2]} />
      }}/>
      <Tab.Screen name={'Profile'} component={ProfileScreen} options={{
        tabBarButton: (props) => <TabButton {...props} item={TabArr[3]} />
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
    position: 'absolute',
    bottom: 20,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.white,
  }
})

export default Navigation