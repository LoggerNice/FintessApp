import {TouchableOpacity, View} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {useState} from "react";

const UILike = ({onPress, isLikes}) => {
  return (
    <TouchableOpacity onPress={onPress} className={'ml-4'}>
      <Ionicons name={isLikes ? "heart-sharp" : "heart-outline"} size={30} color="white" backgroundColor='none'/>
    </TouchableOpacity>
  )
}

export default UILike