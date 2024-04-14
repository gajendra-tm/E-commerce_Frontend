import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutUserAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

export default function SignOut() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(()=>{
        dispatch(signOutUserAsync())
    });

  return (
    <>
    {!user && <Navigate to="/login" replace={true}></Navigate>}
    </>
  )
}
