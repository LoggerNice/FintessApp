import React, {useEffect, useState} from 'react'
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import {Image, Text, TouchableOpacity, View, ScrollView, TouchableHighlight, TextInput} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {URLA} from "../../../axios"
import useFetch from "../../model/UseFetch"
import UIAdd from "../../ui/UIAdd"
import UILike from "../../ui/UILike"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ExerciseCard from "./ExerciseCard";

const ExercisesScreen = () => {
  const navigation = useNavigation()
  const url = `${URLA}/exercises`
  const {data, isLoading} = useFetch(url)
  const [role, setRole] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [text, setText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const _role = await AsyncStorage.getItem('role')
      setRole(_role)
    }

    fetchData()
  }, [role])

  const handleSearch = (text) => {
    setText(text)
    const filteredExercises = data.exercise.filter((exercise) =>
      exercise.name.toLowerCase().includes(text.toLowerCase())
    )

    setSearchResults(filteredExercises)
  }

  if(!isLoading) {
    return (
      <View className={'items-center'}>
        <Text className={'text-white text-bold text-xl'}>Загрузка...</Text>
      </View>
    )
  }

  return (
    <View className={'mx-4'}>
      <View className={'mt-5 mb-6 flex flex-row justify-between items-center'}>
        {isVisible ?
          <View className={'w-2/3'}>
            <TextInput
              placeholder={'Введите текст'}
              onChangeText={handleSearch}
              value={text}
              className={'text-white border-b-[1px] border-white pt-1 w-full'}
              placeholderTextColor={'rgba(255,255,255,0.5)'}
            />
          </View>
          :
          <View className={'flex-row items-center'}>
            <Ionicons name="list" size={30} color="white" backgroundColor='null'/>
            <Text className={'font-semibold text-xl text-white pl-3'}>Упражнения</Text>
          </View>
        }
        {role === 'user' ?
          <View className={'flex flex-row'}>
            <TouchableOpacity onPress={() => {setIsVisible(prevState => !prevState)}}>
              <Ionicons name="search" size={30} color="white" backgroundColor='null'/>
            </TouchableOpacity>
            <TouchableOpacity className={'ml-4'} onPress={() => {console.log('Переадресация на страницу с заметками')}}>
              <Ionicons name={"heart-sharp"} size={30} color="white" backgroundColor='none'/>
            </TouchableOpacity>
          </View>
          :
          <View className={'flex flex-row'}>
            <TouchableOpacity className={'ml-4'} onPress={() => navigation.navigate('Add', {isNews: false})}>
              <Ionicons name={"add-circle"} size={30} color="white" backgroundColor='none'/>
            </TouchableOpacity>
          </View>
        }
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'flex-row w-full h-full flex-wrap justify-between mb-20'}>
          {isVisible ?
            searchResults.map(exercise =>
              <TouchableHighlight key={exercise._id} onPress={() => navigation.navigate('Exercise', {id: exercise._id, role: role})}>
                <ExerciseCard exercise={exercise} role={role}/>
              </TouchableHighlight>
            )
            :
            data.exercise.map(exercise =>
              <TouchableHighlight key={exercise._id} onPress={() => navigation.navigate('Exercise', {id: exercise._id, role: role})}>
                <ExerciseCard exercise={exercise} role={role}/>
              </TouchableHighlight>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default ExercisesScreen;