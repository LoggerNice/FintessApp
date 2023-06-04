import Exercises from "../models/Exercises.js";

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

function fetchExercises(exerciseTypes, levelTrening, numberOfExercises) {
  return new Promise((resolve, reject) => {
    Exercises.find({type: { $in: exerciseTypes }, difficulty: levelTrening}, ).limit(numberOfExercises).exec((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  });
}

export const createTrainingProgram = (goal, levelTrening, anthropometricData) => {
  const trainingProgram = []
  const levels = {'Начинающий': 5, 'Средний': 7, 'Опытный': 9}
  const days = ['Понедельник', 'Среда', 'Пятница']
  const goalTypes = {
    'Поддержание формы': ['Кардио', 'Силовая'],
    'Похудение': ['Кардио', 'Силовая'],
    'Набор массы': ['Силовая', 'Кардио']
  }

  const exerciseTypes = searchInObject(goalTypes, goal)
  const numberOfExercises = searchInObject(levels, levelTrening)

  const firstDay = fetchExercises(exerciseTypes[0], levelTrening, numberOfExercises)
  const secondDay = fetchExercises(exerciseTypes[1], levelTrening, numberOfExercises)
  const thirdDay = fetchExercises(exerciseTypes[0], levelTrening, numberOfExercises)
  trainingProgram.push(firstDay, secondDay, thirdDay)

  return Promise.all(trainingProgram)
    .then(program => {
      return program.map((exercises, idx) => {
        return exercises.map(exercise => {
          const { sets, repetitions } = calculateExercise(goal, levelTrening, exercise.type, anthropometricData)
          return {
            ...exercise._doc,
            sets: sets,
            repetitions: repetitions,
            nameDay: days[idx]
          }
        })
      })
    })
}

export const calculateExercise = (goal, difficulty, type, anthropometricData) => {
  const { weight, height, age, male } = anthropometricData
  let sets = 5
  let repetitions = 20

  if(type === 'Силовая') {
    if (goal === 'Похудение') {
      sets *= 0.4
      repetitions *= 0.6
    } else if (goal === 'Набор массы') {
      sets *= 1
      repetitions *= 0.6
    } else if (goal === 'Поддержание формы') {
      sets *= 0.4
      repetitions *= 0.8
    }
  } else if(type === 'Кардио') {
    if (goal === 'Похудение') {
      sets *= 0.6
      repetitions *= 1
    } else if (goal === 'Набор массы') {
      sets *= 0.4
      repetitions *= 0.6
    } else if (goal === 'Поддержание формы') {
      sets *= 0.4
      repetitions *= 0.8
    }
  }

  if (difficulty === 'Новичок') {
    if(sets > 2) sets -= 1
    repetitions -= 2
  } else if (difficulty === 'Средний') {
    if(sets > 4) sets -= 1
    repetitions -= 2
  }


  if (weight > 80) {
    sets += 1
    repetitions -= 2
  }

  if (height < 160) {
    if(sets > 2) sets -= 1
    repetitions += 2
  }

  if (age > 40 || male === 'Женский') {
    if(sets > 1) sets -= 1
    repetitions += 2
  }

  const max = repetitions + 2
  const min = repetitions - 2
  const repetitionsLast = Math.floor(Math.random() * (max - min + 1)) + min

  return { sets, repetitions: repetitionsLast }
}