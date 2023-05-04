import {View} from "react-native";
import axios from "axios";
import {URLA} from "../../../axios";

const EditScreen = ({navigation}) => {
  const fetchAPI = async () => {
    try {
      return await axios.patch(`${URLA}/profile`)
    } catch (e) {
      console.log('Ошибка изменения данных на сервере:', e)
    }
  }

  const onPress = () => {
    navigation.navigate('Profile')
  }

  return (
    <View>

    </View>
  )
}

export default EditScreen