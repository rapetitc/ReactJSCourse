import React from "react";
import Navbar from "./Componets/Navbar/Navbar";
import ItemListContainer from "./Componets/ItemListContainer/ItemListContainer";

const App = () => {
  return (
    <>
      <Navbar UserName="Ruben Petit"></Navbar>
      <ItemListContainer></ItemListContainer>
    </>
  );
};

export default App;
