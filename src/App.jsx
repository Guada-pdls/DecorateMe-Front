import { UserProvider } from "./Context/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import ProductsContainer from "./Components/Products/ProductsContainer";
import ProductDetail from "./Components/Products/ProductDetail/ProductDetail";
import Cart from "./Components/Cart/Cart";
import NewProduct from "./Components/NewProduct/NewProduct";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
// import Chat from './Components/Chat/Chat'

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
            <Route path="/new_product" element={<NewProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/reset-password/:token" element={<ResetPassword/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            {/* <Route path='/chat' element={<Chat/>}/> */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
