import { useState, useEffect } from 'react'
import {getUserStorage} from "./Storage"

function useUser() {
  const [user, setUser] = useState({id: '', role: '', token: '', name: 'Вадим', exp: 352, photo: "https://i.yapx.cc/PdTRU.jpg"})
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {id, token, name, exp, role, photo} = await getUserStorage()
        setUser({id:id, role: role, token: token, name: name, exp: exp, photo: photo})
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return {
    user,
    isLoading
  }
}

export default useUser