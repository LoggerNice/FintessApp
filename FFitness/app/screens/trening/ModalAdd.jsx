import {useState} from "react"
import {Modal, View} from "react-native"
import UIField from "../../ui/UIField"
import UIButton from "../../ui/UIButton"

const ModalAdd = ({ visible, onClose }) => {
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')

  const handleSave = () => {
    onClose()
  }

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View>
        <UIField
          placeholder="Количество подходов"
          value={sets}
          onChangeText={text => setSets(text)}
        />
        <UIField
          placeholder="Количество выполнений"
          value={reps}
          onChangeText={text => setReps(text)}
        />
        <UIButton title="Сохранить" onPress={handleSave} />
      </View>
    </Modal>
  )
}

export default ModalAdd