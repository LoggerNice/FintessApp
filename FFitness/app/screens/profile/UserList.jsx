import {View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {URLA} from "../../../axios";
import useFetch from "../../model/UseFetch";
import React from "react";

const UserList = () => {
  const navigation = useNavigation()
  const url = `${URLA}/users`
  const {data, isLoading} = useFetch(url)

  return (
    <View>
      {isLoading ?
        <View>
          {data.map((user, index) => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile', user._id)}>
              <View key={index} className={'flex-row justify-between w-full mx-5 my-3'}>
                <Text className={'text-primary'}>{user.name}</Text>
                <Text className={'text-primary'}>{user.login}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      :
        <View>
          <Text>Пользователи отсутствуют</Text>
        </View>
      }
    </View>
  )
}

export default UserList