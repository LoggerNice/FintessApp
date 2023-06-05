import {TouchableOpacity} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import React, {useState} from 'react'

const UIAdd = ({onPress}) => {
  const [isAdd, setIsAdd] = useState(false)

  return (
    <TouchableOpacity onPress={onPress} className={'ml-4'} disabled={false}>
      <Ionicons name={isAdd ? 'add-circle' : 'add-circle-outline'} size={30} color='white' backgroundColor='none'/>
    </TouchableOpacity>
  )
}

export default UIAdd