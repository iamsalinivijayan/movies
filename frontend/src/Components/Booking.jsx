import React, { useContext } from 'react'
import UserContext from '../Context/userContext'

const Booking = () => {
    const {user, setUser} = useContext(UserContext)
    console.log("UserContext from Booking", user)
  return (
    <div>
    </div>
  )
}

export default Booking