import {Text, TouchableHighlight} from "react-native";

const UIButton = ({title, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress} className="bg-primary rounded-xl py-4 my-2">
      <Text className="text-white text-center">{title}</Text>
    </TouchableHighlight>
  )
}

export default UIButton