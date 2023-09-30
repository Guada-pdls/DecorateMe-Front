/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import Swal from 'sweetalert2'
import { redirect } from 'react-router-dom'

const UserContext = createContext([])

const UserProvider = ({ children }) => {

  const socket = io("http://localhost:8080")

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [socket])


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? {})

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const [cart, setCart] = useState([])
  const [quantityProducts, setQuantityProducts] = useState(0);

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
      .catch((err) => {
        if (err.response.status === 401) setUser({})
        console.log(err)
      });
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
      })
      .catch((err) => console.log(err));
  }

  const purchase = async cid => {
    return await axios.post(`http://localhost:8080/api/cart/${cid}/purchase`, {}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  const signInGoogle = async () => {
    // redirect('localhost:8080/api/session/google')
    return axios.get('http://localhost:8080/api/session/current',
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(res => {
        setUser(res.data.response.user)
      })
      .catch(err => Swal.fire('Error', err.response.data.error, 'error'))
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
    <UserContext.Provider value={{ user, setUser, cart, setCart, getCart, quantityProducts, setQuantityProducts, purchase, register, login, logout, forgotPassword, ableToReset, resetPassword, signInGoogle, socket }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }