import {useNavigation} from "@react-navigation/native"
import React from "react"
import axios from "axios"
import {URLA} from "../../../axios"
import {getUserStorage} from "../../model/Storage"
import {Text, View} from "react-native"
import UIButton from "../../ui/UIButton"

const Instruction = () => {
  const navigation = useNavigation()

  const acceptHandler = async () => {
    const id = await getUserStorage()
    const data = {acceptInstruction: true}
    await axios.patch(`${URLA}/profile/${id}`, {data})

    navigation.navigate('Navigation')
  }

  return (
    <View className={'px-8 mx-4'}>
      <Text className={'font-bold text-4xl mb-[54] text-white text-center'}>Инструкция по технике безопасности при занятиях в фитнес-клубе</Text>
      <Text>1. При выполнении упражнений со штангой необходимо использовать замки
        безопасности.
        2. Выполнение базовых упражнений (жим лежа, приседания со штангой) необходимо
        производить при страховке со стороны партнёра.
        3. Выполнение упражнений с отягощением или весами, близкими к максимальным
        для занимающегося, разрешается только при непосредственной страховке
        опытным партнером.
        4. Не допускается перегрузка тренажерных устройств сверх нормы дополнительным
        навешиванием грузов.
        5. Передвигайтесь по спортзалу не торопясь, не заходите в рабочую зону других
        занимающихся. Запрещается работа на неисправных тренажерах! В случае
        обнаружения неисправностей (надрыв троса, механические повреждения)
        сообщите об этом ИНСТРУКТОРУ ТРЕНАЖЁРНОГО ЗАЛА ИЛИ НА
        РЕЦЕПЦИЮ КЛУБА.
        6. При выполнении базовых упражнений (становая тяга, приседания и т.д.)
        необходимо пользоваться атлетическим поясом.
        7. Используйте каждый тренажер только по его прямому назначению, руководствуясь
        инструкцией по технике выполнения упражнения, обозначенной на самом
        тренажере.
        8. Обязательно воспользуйтесь правом получить бесплатную тренировку –
        инструктаж в тренажерном зале.
        9. Уважайте окружающих. Соблюдайте личную гигиену. Не используйте перед
        тренировкой парфюм с сильным запахом, это может мешать окружающим. Не
        занимайте тренажер, если вы не работаете на нем или отдыхаете между подходами
        длительное время. Стелите полотенце, чтобы не оставлять на тренажере следы
        пота.
        10. Все крупные, длинные украшения, которыми Вы можете зацепиться за тренажеры
        и получить травму, необходимо снять до входа на территорию Тренажерного зала.
        11. Соблюдайте чистоту и порядок в зале. Не разбрасывайте диски и гантели. После
        выполнения упражнения возвращайте их на место. Разбирая стоящую на стойках
        штангу, снимайте диски попеременно (один диск с одной стороны, затем - один с
        другой). Перевес на 30 кг на одном конце штанги может привести к ее падению.
        12. Запрещается приступать к занятиям в зале при незаживших травмах, обострении
        хронических заболеваний и общем недомогании. Помните, Вы несете личную
        ответственность за свое здоровье! </Text>
      <UIButton title={'Согласен'} onPress={acceptHandler}/>
    </View>
  )
}

export default Instruction