import {Text, TouchableHighlight} from "react-native";

const UIButton = ({title, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress} className="w-full bg-primary rounded-full py-4 px-4">
      <Text className="text-white text-center font-bold">{title}</Text>
    </TouchableHighlight>
  )
}

export default UIButton