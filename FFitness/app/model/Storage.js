import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserStorage = async () => {
  const id = await AsyncStorage.getItem('_id')
  const token = await AsyncStorage.getItem('token')
  const name = await AsyncStorage.getItem('name')
  const exp = await AsyncStorage.getItem('exp')
  const role = await AsyncStorage.getItem('role')
  const photo = await AsyncStorage.getItem('photo')

  return {id, token, name, exp, role, photo}
}

export const clearStorage = async () => {
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('_id')
  await AsyncStorage.removeItem('name')
  await AsyncStorage.removeItem('exp')
  await AsyncStorage.removeItem('role')
  await AsyncStorage.removeItem('photo')
  await AsyncStorage.removeItem('access')
}

export const setUserStorage = async (result) => {
  await AsyncStorage.setItem('token', result.data.token)
  await AsyncStorage.setItem('_id', result.data._id)
  await AsyncStorage.setItem('role', result.data.role)
  await AsyncStorage.setItem('name', result.data.name)
  await AsyncStorage.setItem('photo', result.data.avatarURL)
  await AsyncStorage.setItem('exp', String(result.data.experience))
}