/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext([])

const UserProvider = ({ children }) => {

  const [user, setUser] = useState({})

  const [cart, setCart] = useState([])
  const [quantityProducts, setQuantityProducts] = useState(0);

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

  const forgotPassword = email => {
    return axios
      .post(
        'http://localhost:8080/api/session/forgot-password',
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }  
      ,)
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
    <UserContext.Provider value={{ user, setUser, cart, setCart, getCart, quantityProducts, setQuantityProducts, register, login, logout, forgotPassword, signInGH }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }