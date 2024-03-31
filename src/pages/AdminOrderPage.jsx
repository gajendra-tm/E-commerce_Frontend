import React from "react";
import NavBar from "../features/navbar/NavBar";
import AdminOrder from "../features/admin/component/AdminOrder";

export default function AdminOrderPage() {
  return (
    <>
      <NavBar>
        <AdminOrder></AdminOrder>
      </NavBar>
    </>
  );
}
