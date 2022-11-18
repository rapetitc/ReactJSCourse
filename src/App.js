import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Utilities/Buttons.css";
import "./Utilities/Input.css";

import NavBar from "./Components/Navbar/Navbar";
import ItemListContainer from "./Pages/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./Pages/ItemDetailContainer/ItemDetailContainer";
import Categories from "./Pages/Categories/Categories";
import Category from "./Pages/Category/Category";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import CartView from "./Pages/CartView/CartView";
import Session from "./Pages/Session/Session";
import Profile from "./Pages/Profile/Profile";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

import { CartCounterProvider } from "./Context/CartCounter";
import { AuthenticatorProvider } from "./Context/Authenticator";
import { BehaviorsProvider } from "./Context/Behaviors";

function App() {
  return (
    <CartCounterProvider>
      <AuthenticatorProvider>
        <BehaviorsProvider>
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
            <Route path="create-account/*" element={<CreateAccount />}></Route>
            <Route path="session" element={<Session />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="cart">
              <Route path="" element={<CartView />}></Route>
              <Route path="checkout" element={<CartView />}></Route>
              <Route path="confirmation" element={<CartView />}></Route>
              <Route path="congratulations" element={<CartView />}></Route>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </BehaviorsProvider>
      </AuthenticatorProvider>
    </CartCounterProvider>
  );
}

export default App;
