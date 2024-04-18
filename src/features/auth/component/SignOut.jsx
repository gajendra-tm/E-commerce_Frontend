import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";
import { fetchLoggedInUserInfoAsync } from "../../user/userSlice";

export default function SignOut() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(fetchLoggedInUserInfoAsync(null));
  });

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}
