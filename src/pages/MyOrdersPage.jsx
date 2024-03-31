import React from 'react'
import NavBar from "../features/navbar/NavBar";
import MyOrders from '../features/user/component/MyOrders';


export default function MyOrdersPage() {
  return (
    <>
    <NavBar>
        <h1 className="text-2xl font-bold w-56 drop-shadow-xl text-center">My Orders</h1>
        <MyOrders></MyOrders>
    </NavBar>
    </>
  )
}
