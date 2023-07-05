/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const SessionContext = createContext([])

const SessionProvider = ({ children }) => {

  const [user, setUser] = useState({})
  const [session, setSession] = useState(false)

  const [cart, setCart] = useState([])
  const [quantityProducts, setQuantityProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // session
    axios
      .get("http://localhost:8080/api/auth/session", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(async (res) => {
        setUser(res.data)
        if (res.data.email) {
          setSession(true);
          let cartProducts = res.data.response.products;
          let products = [];
          let totalProducts = 0;
          for (let product of cartProducts) {
            products.push({
              id: product.pid,
              product: await axios
                .get(`http://localhost:8080/api/products/${product.pid}`)
                .then((res) => res.data.response),
              units: product.units,
            });
            totalProducts += product.units;
          }
          setProducts(products);
          setTotalProducts(totalProducts);
        }
      })
      .catch((err) => console.log(err));
  }, [])

  const getCart = async () => {
    axios
      .get(`http://localhost:8080/api/cart/${user.cid}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setQuantityProducts(res.data.response.products.length);
      })
      .catch((err) => console.log(err));
  }

  const register = async formData => {
    return await axios
      .post("http://localhost:8080/api/auth/register", formData)
  }

  const login = async formData => {
    return await axios
      .post("http://localhost:8080/api/auth/login", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
  }

  const logout = async () => {
    return await axios
      .post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setSession(false)
        setUser({})
        window.location.href = "/"
      })
      .catch((err) => console.log(err));
  }

  const signInGH = async () => {
    return axios.get('http://localhost:8080/api/auth/github',
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <SessionContext.Provider value={{ user, setUser, cart, setCart, getCart, quantityProducts, setQuantityProducts, totalProducts, products, session, setSession, register, login, logout, signInGH }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext, SessionProvider }