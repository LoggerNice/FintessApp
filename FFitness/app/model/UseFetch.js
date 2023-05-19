import {useCallback, useEffect, useState} from "react";
import axios from "axios";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: false,
    error: false,
  })

  const fetchData = useCallback(async() => {
    try {
      const response = await axios.get(url)
      const data = await response.data
      if (data) {
        setFetchedData({
          data: data.results ? data.results : data,
          isLoading: true,
          error: false
        })
      }
    } catch (e) {
      console.log("Ошибка запроса.", url, e)
      setFetchedData({
        data: [],
        isLoading: false,
        error: true
      })
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [url, fetchData])

  const {data, isLoading, error} = fetchedData
  return {data, isLoading, error}
}

export default useFetch