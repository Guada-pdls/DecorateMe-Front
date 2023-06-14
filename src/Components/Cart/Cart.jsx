import { useState, useEffect } from "react"
import CartCard from "./CartCard"
import './Cart.css'

const Cart = () => {

    const [cart, setCart] = useState({})
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState({products: 0, price: 0})
    
    useEffect(() => {
        // Llamada a mongo para cart
        setCart({
            "_id": "647f9a508af5814325d1e75a",
            "products": [
                {
                    "pid": "647a2cd85a409d174fba9c1f",
                    "units": 6
                },
                {
                    "pid": "647a2c94983021c28d02a685",
                    "units": 4
                },
                {
                    "pid": "648756cb387dbab73002f334",
                    "units": 7
                },
                {
                    "pid": "648756a3387dbab73002f32e",
                    "units": 6
                }
            ],
            "__v": 0
        })
        setLoad(false)
    }, [])

    useEffect(() => {
        // console.log(total) // Price no trae nada, hay que traer el prod y su price
        cart?.products?.forEach(product => {
            let {products, price} = total
            setTotal({
                products: products + product.units, 
                price: price + product.price
            })
        })
    }, [cart])

    return (
        <section className="cartSection" id="cartSection">
            <h2 className="sectionTitle">Cart</h2>
            <div className="cartContainer">
                <div className="">
                    <div className="cartContainer__top">
                        <a className="returnBtn" href="/products">
                            <i className="fa-solid fa-arrow-left"></i>
                            <h4>Return</h4>
                        </a>
                        <button className="clearProductsBtn">Clear</button>
                    </div>
                    <div className="cartContainer__sections">
                        <h3 className="cartContainer__section productSection">Product</h3>
                        <h3 className="cartContainer__section unitsSection">Units</h3>
                        <h3 className="cartContainer__section productSection">Price</h3>
                    </div>
                </div>
                <div className="cartList">
                    {load ? 'cargando' : cart.products.map(product => <CartCard product={product} key={product.pid} />)}
                </div>
                <div className="cartContainer__bottom">
                    <h2 className="totalProducts">Products {total.products}</h2>
                    <h2 className="totalPrice">Total: {total.price} €</h2>
                    <button className="btn payBtn">Pay</button>
                </div>
            </div>
        </section>
    )
}

export default Cart