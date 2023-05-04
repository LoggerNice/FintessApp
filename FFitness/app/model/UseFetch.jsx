import {useCallback, useState} from "react";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  })

  const fetchData = useCallback()
}

export default useFetch