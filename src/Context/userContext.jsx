import React,{useState} from 'react';

export const UserContext = React.createContext(null)

const UserContextProvider = ({children})=> {
  const [userId, setUserId] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  return(
    <UserContext.Provider value={{userId, setIsAuth, isAuth, setUserId}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
