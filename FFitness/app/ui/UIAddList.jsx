import {View, Text} from "react-native"
import { CheckBox } from '@rneui/themed'
import {useEffect, useState} from "react"

const UIAddList = ({value, onChange}) => {
  const [diseases, setDiseases] = useState([
    { id: 1, name: 'Заболевания дыхательной системы'},
    { id: 2, name: 'Заболевания сердца \\ сосудов'},
    { id: 3, name: 'Проблемы с суставами'},
    { id: 4, name: 'Беременность'},
    { id: 5, name: 'Наличие травм'},
    { id: 6, name: 'Повышенное арт. давление'},
  ])

  useEffect(() => {
    const updatedDiseases = diseases.map(disease => ({
      ...disease,
      checked: value.includes(disease.id),
    }))

    setDiseases(updatedDiseases)
  }, [])

  const handleToggleCheckbox = (diseaseId) => {
    const updatedDiseases = diseases.map(disease => {
      if (disease.id === diseaseId) {
        return { ...disease, checked: !disease.checked }
      }

      return disease
    })

    const selectedDiseaseIds = diseases
      .filter(disease => disease.checked)
      .map(disease => disease.id)
    onChange(selectedDiseaseIds)

    setDiseases(updatedDiseases)
  }

  return (
    <View className={'pt-3 mb-[20px] border-0 rounded-xl bg-input text-white'}>
      <Text className={'text-white opacity-50 mb-3 pl-5'}>Заболевания</Text>
      {diseases.map(disease => (
        <View key={disease.id} className={'flex-row justify-between items-center mb-1.5 ml-5'}>
          <Text className={'text-white'}>{disease.name}</Text>
          <CheckBox
            containerStyle={{backgroundColor: 'transparent', padding: 0}}
            checked={disease.checked}
            onPress={() => handleToggleCheckbox(disease.id)}
          />
        </View>
      ))}
    </View>
  )
}

export default UIAddList