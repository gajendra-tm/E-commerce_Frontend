import React from 'react';
import NavBar from "../features/navbar/NavBar"
import AdminProductForm from '../features/admin/component/AdminProductForm'

function AdminProductFormPage() {
  return (
    <>
    <NavBar>
    <AdminProductForm></AdminProductForm>
    </NavBar>
    </>
  )
}

export default AdminProductFormPage