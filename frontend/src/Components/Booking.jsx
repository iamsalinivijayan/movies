import React, { useContext } from 'react'
import Navbar from '../Elements/Navbar'
import UserContext from '../Context/userContext'

const Booking = () => {
    const {user, setUser} = useContext(UserContext)
    console.log("UserContext from Booking", user)
  return (
    <div>
        <Navbar/>
    </div>
  )
}

export default Booking