import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice'

export default function AdminProtected({children}) {
    const user = useSelector(selectLoggedInUser)// provides only id and role
    const userInfo = useSelector(selectUserInfo)// provides full user info
    console.log(user,"user")
    console.log(userInfo, "userInfo")
    
    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if(userInfo && userInfo.role !== "admin"){
        return <Navigate to="/login" replace={true}></Navigate>
    }
 return children;
}
