import React from "react";
import NavBar from "../features/navbar/Navbar";
import ProductFilter from "../features/product/component/ProductFilter";

export default function Home() {
  return (
    <>
      <NavBar>
        <ProductFilter></ProductFilter>
      </NavBar>
    </>
  );
}
