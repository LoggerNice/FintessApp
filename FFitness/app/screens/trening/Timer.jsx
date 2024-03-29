import React, {useState, useEffect} from 'react'
import {View, Text, Image} from 'react-native'
import UIButton from "../../ui/UIButton"
import AsyncStorage from "@react-native-async-storage/async-storage"

function searchInObject(object, formData) {
  let result = null
  for (const level in object) {
    if (level === formData) {
      result = object[level]
      break
    }
  }
  return result
}

const warmUp = [
  {
    name: 'Наклоны головы вперед, назад, влево и вправо',
    gif: 'https://media.giphy.com/media/L1KAmJvO71kgNY2ZuG/giphy.gif',
    sets: 1,
    repetitions: 10
  },
  {
    name: 'Круговое вращение руками',
    gif: 'https://media.giphy.com/media/vnLEQWUtYAzIzBSGtm/giphy.gif',
    sets: 1,
    repetitions: 10
  },
  {
    name: 'Вращательные движения тазом',
    gif: 'https://media.giphy.com/media/LFRyUPMqVD0TIejeJM/giphy.gif',
    sets: 1,
    repetitions: 10
  },
  {
    name: 'Приседания',
    gif: 'https://media.giphy.com/media/0jXXEtB3WFjHnyWn5r/giphy.gif',
    sets: 1,
    repetitions: 10
  },
  {
    name: 'Круговые движения коленями',
    gif: 'https://media.giphy.com/media/ei84pQZ37x9niGHf1p/giphy-downsized-large.gif',
    sets: 1,
    repetitions: 10
  },
  {
    name: 'Круговые движения носком',
    gif: 'https://media.giphy.com/media/uz590i7x1GEfhqan6Q/giphy.gif',
    sets: 1,
    repetitions: 10
  },
]


function Timer({day}) {
  const difficultyCoeff = 1
  const setsCoeff = 0.4
  const repetitionsCoeff = 0.4
  const levels = {'Начинающий': 1, 'Средний': 2, 'Опытный': 3}
  const urlTimeOut = 'https://aproduct22.ru/800/600/https/pbs.twimg.com/media/CoTFt5nUMAAWPpK.jpg'
  const program = [...warmUp, ...day]

  const [time, setTime] = useState(60)
  const [points, setPoints] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [idxSets, setIdxSets] = useState(1)
  const [isTimeOut, setIsTimeOut] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isWarmUp, setIsWarmUp] = useState(true)

  useEffect(() => {
    let interval = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      if (!isWarmUp) {
        setIsTimeOut(prevState => !prevState)
        if (!isTimeOut) {
          setIdxSets(prevState => prevState + 1)
        }

        if (idxSets > program[currentExercise].sets) {
          setPoints(prevState => prevState + Math.round(program[currentExercise].sets * setsCoeff + program[currentExercise].repetitions * repetitionsCoeff + searchInObject(levels, program[currentExercise].difficulty) * difficultyCoeff))
          AsyncStorage.getItem('exp').then(value => {
            const updateValue = Number(value) + points

            AsyncStorage.setItem('exp', String(updateValue)).then(() => {
              console.log('Очки успешно сохранены')
            }).catch(error => console.log('Ошибка при сохранении набранных очков.', error))
          }).catch(error => console.log('Ошибка при получении набранных очков.', error))

          if (currentExercise < program.length - 1) {
            setCurrentExercise(prevState => prevState + 1)
          } else {
            setIsActive(false)
            setIsDone(prevState => !prevState)
            setIsTimeOut(true)
          }
          setIdxSets(1)
        }

        setTime(isTimeOut ? Math.round(program[currentExercise].repetitions * 10) : 60)
      } else {
        setCurrentExercise(prevState => prevState + 1)
        currentExercise === 4 && setIsWarmUp(false)
        setTime(60)
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [isActive, time, isTimeOut])

  const handleStart = () => {
    setIsActive(prevState => !prevState)
  }

  const formatTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return (
      <View className={'flex-row items-end justify-center'}>
        <Text className={'text-white text-4xl font-bold'}>{minutes < 10 ? '0' + minutes : minutes}</Text>
        <Text className={'text-white text-xl mr-3 pb-1'}>м</Text>
        <Text className={'text-white text-4xl font-bold'}>{seconds < 10 ? '0' + seconds : seconds}</Text>
        <Text className={'text-white text-xl pb-1'}>с</Text>
      </View>
    )
  }

  return (
    <View className={'relative w-full'}>
      {isDone ?
        <Text className={'text-white text-xl mx-4 mb-3 text-center'}>Тренировка упешно выполнена!</Text>
        :
        <Text className={'text-white text-xl mx-4 mb-3 text-center'}>{isTimeOut ? 'Время отдыха' : program[currentExercise].name + '\n' + idxSets + ' подход | ' + program[currentExercise].repetitions + ' повторений'}</Text>
      }
      <Image source={{uri: isTimeOut ? urlTimeOut : program[currentExercise].gif}} resizeMode='cover' className={'w-full h-[400px] rounded-lg mb-3'}/>
      {!isDone &&
        <View className={'mx-4'}>
          {formatTime()}
          <View className={'mt-5'}>
            <UIButton title={isActive ? 'Пауза' : 'Старт'} onPress={handleStart}/>
          </View>
        </View>
      }
    </View>
  )
}

export default Timer