import {View} from "react-native";
import axios from "axios";

const medForm = () => {
  const fetchGetAPI = async () => {
    try {
      return await axios.get('http://192.168.65.98:3000/medical')
    } catch (e) {
      console.log('Ошибка получения данных с сервера:', e)
    }
  }

  const fetchPatchAPI = async () => {
    try {
      return await axios.patch('http://192.168.65.98:3000/medical')
    } catch (e) {
      console.log('Ошибка отправки данных на сервер:', e)
    }
  }

  return (
    <View>

    </View>
  )
}

export default medForm()