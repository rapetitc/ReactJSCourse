import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Componets/Navbar/Navbar";
import ItemListContainer from "./Componets/ItemListContainer/ItemListContainer";
import Store from "./Componets/Store/Store";
import Contact from "./Componets/Contact/Contact";
import AboutUs from "./Componets/AboutUs/AboutUs";
import CartView from "./Componets/CartView/CartView";
import Profile from "./Componets/Profile/Profile";
import ItemDetailContainer from "./Componets/ItemDetailContainer/ItemDetailContainer";
import Categories from "./Componets/Categories/Categories";
import Category from "./Componets/Category/Category";

import NotFoundPage from "./Componets/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar UserName="Ruben Petit"></Navbar>
        <Routes>
          <Route path="/" element={<ItemListContainer></ItemListContainer>}></Route>
          <Route path="/store" element={<Store></Store>}></Route>
          <Route path="/contact-us" element={<Contact></Contact>}></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/cart" element={<CartView></CartView>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/product" element={<ItemDetailContainer></ItemDetailContainer>}>
            <Route path=":id" element={<ItemDetailContainer></ItemDetailContainer>}></Route>
          </Route>
          <Route path="/product/categories" element={<Categories></Categories>}></Route>
          <Route path="/product/category" element={<Category></Category>}>
            <Route path=":id" element={<Category></Category>}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
