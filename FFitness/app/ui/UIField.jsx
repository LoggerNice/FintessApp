import {TextInput, View} from "react-native";

const UIField = ({onChange, placeholder, value, isSecure}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      secureTextEntry={isSecure}
      className={'p-3 my-2 border rounded-xl bg-input'}
      placeholderTextColor={'text-txt'}
    />
  )
}

export default UIField