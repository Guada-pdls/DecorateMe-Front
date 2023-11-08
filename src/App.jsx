import { UserProvider } from "./Context/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import ProductsContainer from "./Components/Products/ProductsContainer";
import ProductDetail from "./Components/Products/ProductDetail/ProductDetail";
import Cart from "./Components/Cart/Cart";
import NewProduct from "./Components/Products/NewProduct";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import Checkout from "./Components/Checkout";
import Chat from './Components/Chat/Chat'
import GoogleLogin from "./Components/GoogleLogin";
import Users from "./Components/Users/Users";


function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsContainer />} />
            <Route path="/products/:pid" element={<ProductDetail />} />
            <Route path="/new-product" element={<NewProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:cid/purchase" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/reset-password" element={<ResetPassword/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/login/google" element={<GoogleLogin/>}></Route>
            <Route path="/users" element={<Users/>}></Route>
            <Route path="/chat" element={<Chat/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
