/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext([])

const UserProvider = ({ children }) => {

  const [user, setUser] = useState({})

  const [cart, setCart] = useState([])
  const [quantityProducts, setQuantityProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // logged in
    axios
      .get("http://localhost:8080/api/session/current", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(async (res) => {
        setUser(res.data.response.user)
        // let cartProducts = res.data.response.products;
        // let products = [];
        // let totalProducts = 0;
        // for (let product of cartProducts) {
        //   products.push({
        //     id: product.pid,
        //     product: await axios
        //       .get(`http://localhost:8080/api/products/${product.pid}`)
        //       .then((res) => res.data.response),
        //     units: product.units,
        //   });
        //   totalProducts += product.units;
        // }
        // setProducts(products);
        // setTotalProducts(totalProducts);
      })
      .catch(() => setUser({}));
  }, [])

  const getCart = async () => {
    // axios
    //   .get(`http://localhost:8080/api/cart/${user.cid}`, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     setQuantityProducts(res.data.response.products.length);
    //   })
    //   .catch((err) => console.log(err));
  }

  const register = async formData => {
    return await axios
      .post("http://localhost:8080/api/session/register", formData)
  }

  const login = async formData => {
    return await axios
      .post("http://localhost:8080/api/session/login", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
  }

  const logout = async () => {
    return await axios
      .get(
        "http://localhost:8080/api/session/logout",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
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
    <UserContext.Provider value={{ user, setUser, cart, setCart, getCart, quantityProducts, setQuantityProducts, totalProducts, products, register, login, logout, signInGH }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }