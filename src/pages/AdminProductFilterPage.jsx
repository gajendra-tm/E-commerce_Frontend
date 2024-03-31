import React from "react";
import NavBar from "../features/navbar/NavBar";
import AdminProductFilter from "../features/admin/component/AdminProductFilter";

export default function Home() {
  return (
    <>
      <NavBar>
        <AdminProductFilter></AdminProductFilter>
      </NavBar>
    </>
  );
}
