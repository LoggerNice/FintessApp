import {TextInput, TouchableOpacity, View} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";

const UIField = ({onChange, placeholder, value, isSecure}) => {
  const [visible, setVisible] = useState(isSecure || false)

  return (
    <View className={`${isSecure && 'flex-row justify-between items-center border-0 h-[60px] rounded-xl bg-input'} + mb-3`}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        secureTextEntry={visible}
        className={'py-3 pl-5 h-[60px] border-0 rounded-xl bg-input text-white'}
        placeholderTextColor={'rgba(255,255,255,0.5)'}
      />
      {isSecure &&
        <TouchableOpacity className={'pr-5'} onPress={() => setVisible(prevState => !prevState)}>
          <Ionicons name={"eye"} size={22} color={visible ? 'white' : '#6842FF'} backgroundColor='none'/>
        </TouchableOpacity>
      }
    </View>
  )
}

export default UIField