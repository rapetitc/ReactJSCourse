import { Route, Routes } from "react-router-dom";
import "./App.css";
/* Components */
import NavBar from "./Components/Navbar/Navbar";
import ItemListContainer from "./Pages/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./Pages/ItemDetailContainer/ItemDetailContainer";
import Categories from "./Pages/Categories/Categories";
import Category from "./Pages/Category/Category";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import CartView from "./Pages/CartView/CartView";
import CheckOutView from "./Pages/CheckOutView/CheckOutView";
import Session from "./Pages/Session/Session";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
/* Context */
import { CartCounterProvider } from "./Context/CartCounter";
import { AuthenticatorProvider } from "./Context/Authenticator";

function App() {
  return (
    <CartCounterProvider>
      <AuthenticatorProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<ItemListContainer />}></Route>
          <Route path="product">
            <Route path="category">
              <Route path=":id" element={<Category />}></Route>
            </Route>
            <Route path="categories" element={<Categories />}></Route>
            <Route path=":id" element={<ItemDetailContainer />}></Route>
          </Route>
          <Route path="create-account">
            <Route path="" element={<CreateAccount />}></Route>
            <Route path="landing" element={<CreateAccount />}></Route>
            <Route path="requirements" element={<CreateAccount />}></Route>
            <Route path="email-verification" element={<CreateAccount />}></Route>
            <Route path="personal-info" element={<CreateAccount />}></Route>
            <Route path="create-password" element={<CreateAccount />}></Route>
            <Route path="done" element={<CreateAccount />}></Route>
          </Route>
          <Route path="session" element={<Session />}></Route>
          <Route path="cart">
            <Route path="" element={<CartView />}></Route>
            <Route path="checkout" element={<CheckOutView />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AuthenticatorProvider>
    </CartCounterProvider>
  );
}

export default App;
