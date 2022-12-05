import {Text, TextInput, View} from "react-native"
import {Link} from "@react-navigation/native";
import {useState} from "react";
import UIButton from "../../ui/UIButton";
import UIField from "../../ui/UIField";

const Registration = () => {
  const regHandler = () => {}

  const [data, setData] = useState({login: '', pass: '', repeatPass: ''})

  return (
    <View>
      <Text className="font-bold text-3xl mb-[54]">Создайте свой аккаунт</Text>

      <View>
        <View>
          <UIField placeholder={'Ваш логин'} value={data.login} onChange={value => setData({...data, login: value})}/>
          <UIField placeholder={'Ваш пароль'} value={data.pass} onChange={value => setData({...data, pass: value})}/>
          <UIField placeholder={'Повторите пароль'} value={data.repeatPass} onChange={value => setData({...data, repeatPass: value})}/>
        </View>

        <View className={'mt-2'}>
          <UIButton title={'Создать'} onPress={regHandler}/>
          <Link to={{screen: 'Login'}}>Уже есть аккаунт?</Link>
        </View>
      </View>
    </View>
  )
}

export default Registration