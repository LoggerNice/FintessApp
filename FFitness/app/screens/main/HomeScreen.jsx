import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>Home Page</Text>
      <Button title={"Войти"} onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}

export default HomeScreen;