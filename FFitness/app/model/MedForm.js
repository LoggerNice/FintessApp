import { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {URLA} from "../../axios";
import {setFormStorage} from "./Storage";

function useMedForm() {
  const [form, setForm] = useState({desease: [], access: false, age: 21, weight: 180, height: 70, sertificate: '', goal: '', levelTrening: ''})
  const [isLoadingForm, setLoadingForm] = useState(false);

  const fetchAPI = async () => {
    try {
      const userID = await AsyncStorage.getItem('_id')
      const res = await axios.get(`${URLA}/medical/${userID}`)
      return res.data.form
    } catch (e) {
      console.log('Запрос на получение мед анкеты.', e)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchAPI()
        setForm({access: res.access, desease: res.desease, age: res.age, height: res.height, weight: res.weight, sertificate: res.sertificate, goal: res.goal, levelTrening: res.levelTrening})
        await setFormStorage(res)
        setLoadingForm(true)
      } catch (e) {
        console.log('Ошибка получения мед анкеты.', e)
      }
    }

    fetchUser()
  }, [])

  return {
    form,
    isLoadingForm
  }
}

export default useMedForm