import React from 'react'
import NavBar from "../features/navbar/NavBar"
import MyProfile from '../features/user/component/MyProfile'

export default function MyProfilePage() {
  return (
    <>
    <NavBar>
    <h1 className="text-2xl font-bold w-56 drop-shadow-xl text-center">My Profile</h1>
        <MyProfile></MyProfile>
    </NavBar>
    </>
  )
}
