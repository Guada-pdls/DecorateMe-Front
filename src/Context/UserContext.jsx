/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import Swal from 'sweetalert2'

const UserContext = createContext([])

const reqConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

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

  const getCart = async cid => {
    return await axios.get(`http://localhost:8080/api/cart/${cid}`, reqConfig)
  }

  const deleteOneFromCart = async (cid, pid) => {
    return await axios.delete(`http://localhost:8080/api/cart/${cid}/product/${pid}/1`, reqConfig)
  }

  const clearCart = async cid =>  {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${cid}`, reqConfig)
      setCart([])
    } catch (error) {
      Swal.fire('Error', error.response.data.error)
    }
  }

  const newProduct = async productData => {
    return await axios.post('http://localhost:8080/api/products', productData, reqConfig)
  }
  
  const getUsers = async () => {
    return await axios.get("http://localhost:8080/api/users", reqConfig)
  }

  const updateUser = async (uid, data) => {
    return await axios.put(`http://localhost:8080/api/users/${uid}`, data, reqConfig)
  }

  const deleteUser = async uid => {
    return await axios.delete(`http://localhost:8080/api/users/${uid}`, reqConfig)
  }

  const register = async formData => {
    return await axios
      .post("http://localhost:8080/api/session/register", formData, reqConfig)
  }

  const login = async formData => {
    return await axios
      .post("http://localhost:8080/api/session/login", formData, reqConfig)
  }

  const logout = async () => {
    return await axios
      .get(
        "http://localhost:8080/api/session/logout",
        reqConfig
      )
      .then(() => {
        setUser({})
      })
      .catch((err) => {
        console.log(err)
        err.response.status === 401 && setUser({})
      });
  }

  const purchase = async cid => {
    return await axios.post(`http://localhost:8080/api/cart/${cid}/purchase`, {}, reqConfig)
  }

  const signInGoogle = async () => {
    // redirect('localhost:8080/api/session/google')
    return axios.get('http://localhost:8080/api/session/current',
      reqConfig)
      .then(res => {
        setUser(res.data.response.user)
      })
      .catch(err => Swal.fire('Error', err.response.data.error, 'error'))
  }

  const forgotPassword = email => {
    return axios
      .post(
        'http://localhost:8080/api/session/forgot-password',
        { email }, reqConfig,
      )
  }

  const ableToReset = token => {
    return axios.get(`http://localhost:8080/api/session/reset-password/?token=${token}`,
      reqConfig
    )
  }

  const resetPassword = (password, confirmPassword) => {
    return axios.post(
      'http://localhost:8080/api/session/reset-password',
      {
        password, confirmPassword
      },
      reqConfig
    )
  }

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart, getCart, quantityProducts, setQuantityProducts, purchase, register, login, logout, forgotPassword, ableToReset, resetPassword, signInGoogle, socket, newProduct, deleteOneFromCart, clearCart, getUsers, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }