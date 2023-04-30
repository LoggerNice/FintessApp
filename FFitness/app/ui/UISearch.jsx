import {TouchableOpacity, View} from "react-native"
import {Ionicons} from '@expo/vector-icons'

const UISearch = () => {
  const search = () => {}

  return (
    <TouchableOpacity onPress={search}>
      <Ionicons name="search" size={30} color="white" backgroundColor='null'/>
    </TouchableOpacity>
  )
}

export default UISearch