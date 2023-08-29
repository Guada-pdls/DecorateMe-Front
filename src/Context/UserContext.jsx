/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import axios from 'axios'
import { redirect } from 'react-router-dom'
import { Password } from '@mui/icons-material'

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


  const signInGoogle = async () => {
    redirect('localhost:8080/api/session/google')
    // return axios.get('http://localhost:8080/api/session/google',
    //   {},
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   }).then(res => console.log(res))
    //   .catch(err => console.log(err))
  }

  const forgotPassword = email => {
    return axios
      .post(
        'http://localhost:8080/api/session/forgot-password',
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          withCredentials: true
        },
      )
  }

  const ableToReset = token => {
    return axios.get(`http://localhost:8080/api/session/reset-password/?token=${token}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
  }

  const resetPassword = (password, confirmPassword) => {
    return axios.post(
      'http://localhost:8080/api/session/reset-password',
      {
        password, confirmPassword
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
  }

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart, getCart, quantityProducts, setQuantityProducts, register, login, logout, forgotPassword, ableToReset, resetPassword, signInGoogle }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }