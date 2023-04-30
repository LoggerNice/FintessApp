import {TouchableOpacity, View} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {useState} from "react";

const UILike = () => {
  const [like, setLike] = useState(false)

  return (
    <TouchableOpacity onPress={() => setLike(!like)} className={'ml-4'}>
      <Ionicons name={like ? "heart-sharp" : "heart-outline"} size={30} color="white" backgroundColor='none'/>
    </TouchableOpacity>
  )
}

export default UILike