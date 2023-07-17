import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector(state => state.users)
  return (
   <div>
      <h1>HOME</h1>
      {user && <h1>{user.name}</h1>}
   </div>
  )
}

export default Home