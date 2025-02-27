import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import CreateAccount from "./Pages/CreateAccount";
import LogIn from "./Pages/LogIn";
import Profile from "./Pages/Profile";
import Sell from "./Pages/Sell";
import ItemDetailContainer from "./Pages/ItemDetailContainer";
import Search from "./Pages/Search";
import Categories from "./Pages/Categories";
import Category from "./Pages/Category";
import Cart from "./Pages/Cart";
import Ticket from "./Pages/Ticket";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  // TODO Encerrar enlaces publicos, y privados
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create-account/*" element={<CreateAccount />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/sell" element={<Sell />}></Route>
      <Route path="/product/:id" element={<ItemDetailContainer />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/categories" element={<Categories />}></Route>
      <Route path="/category/:id" element={<Category />}></Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/ticket/:id" element={<Ticket />} />
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
