import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import ProductsContainer from './Components/Products/ProductsContainer'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import Cart from './Components/Cart/Cart'
import NewProduct from './Components/NewProduct/NewProduct'
// import Chat from './Components/Chat/Chat'

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<ProductsContainer/>} />
                    <Route path='/products/:id' element={<ProductDetail/>}/>
                    <Route path='/new_product' element={<NewProduct/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    {/* <Route path='/chat' element={<Chat/>}/> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
