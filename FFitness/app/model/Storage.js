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
  await AsyncStorage.removeItem('desease')
  await AsyncStorage.removeItem('age')
  await AsyncStorage.removeItem('height')
  await AsyncStorage.removeItem('weight')
  await AsyncStorage.removeItem('sertificate')
  await AsyncStorage.removeItem('levelTrening')
  await AsyncStorage.removeItem('goal')
}

export const setUserStorage = async (result) => {
  await AsyncStorage.setItem('token', result.data.token)
  await AsyncStorage.setItem('_id', result.data._id)
  await AsyncStorage.setItem('role', result.data.role)
  await AsyncStorage.setItem('name', result.data.name)
  await AsyncStorage.setItem('photo', result.data.avatarURL)
  await AsyncStorage.setItem('exp', String(result.data.experience))
}

export const setFormStorage = async (result) => {
  await AsyncStorage.setItem('access', JSON.stringify(result.access))
  await AsyncStorage.setItem('desease', JSON.stringify(result.desease))
  await AsyncStorage.setItem('age', result.age.toString())
  await AsyncStorage.setItem('height', result.height.toString())
  await AsyncStorage.setItem('weight', result.weight.toString())
  await AsyncStorage.setItem('sertificate', result.sertificate)
  await AsyncStorage.setItem('goal', result.goal)
  await AsyncStorage.setItem('levelTrening', result.levelTrening)
}

export const getFormStorage = async () => {
  const access = await AsyncStorage.getItem('access')
  const desease = await AsyncStorage.getItem('desease')
  const age = await AsyncStorage.getItem('age')
  const height = await AsyncStorage.getItem('height')
  const weight = await AsyncStorage.getItem('weight')
  const sertificate = await AsyncStorage.getItem('sertificate')
  const goal = await AsyncStorage.getItem('goal')
  const levelTrening = await AsyncStorage.getItem('levelTrening')

  return {access, desease, age, height, weight, sertificate, goal, levelTrening}
}