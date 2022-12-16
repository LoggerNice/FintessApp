import {TextInput} from "react-native";

const UIField = ({onChange, placeholder, value, isSecure}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      secureTextEntry={isSecure}
      className={'py-3 pl-5 mb-[20px] h-[60px] border-0 rounded-xl bg-input text-white'}
      placeholderTextColor={'rgba(255,255,255,0.5)'}
    />
  )
}

export default UIField