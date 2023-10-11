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

const reqConfigWithFiles = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/multipart/form-data"
  },
  withCredentials: true
}

const UserProvider = ({ children }) => {

  const socket = io("http://decorateme.onrender.com")

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
    return await axios.get(`http://decorateme.onrender.com/api/cart/${cid}`, reqConfig)
  }

  const deleteOneFromCart = async (cid, pid) => {
    return await axios.delete(`http://decorateme.onrender.com/api/cart/${cid}/product/${pid}/1`, reqConfig)
  }

  const clearCart = async cid =>  {
    try {
      await axios.delete(`http://decorateme.onrender.com/api/cart/${cid}`, reqConfig)
      setCart([])
    } catch (error) {
      Swal.fire('Error', error.response.data.error)
    }
  }

  const newProduct = async productData => {
    return await axios.post('http://decorateme.onrender.com/api/products', productData, reqConfigWithFiles)
  }
  
  const getUsers = async () => {
    return await axios.get("http://decorateme.onrender.com/api/users", reqConfig)
  }

  const updateUser = async (uid, data) => {
    return await axios.put(`http://decorateme.onrender.com/api/users/${uid}`, data, reqConfig)
  }

  const deleteUser = async uid => {
    return await axios.delete(`http://decorateme.onrender.com/api/users/${uid}`, reqConfig)
  }

  const register = async formData => {
    return await axios
      .post("http://decorateme.onrender.com/api/session/register", formData, reqConfig)
  }

  const login = async formData => {
    return await axios
      .post("http://decorateme.onrender.com/api/session/login", formData, reqConfig)
  }

  const logout = async () => {
    return await axios
      .delete(
        "http://decorateme.onrender.com/api/session/logout",
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
    return await axios.post(`http://decorateme.onrender.com/api/cart/${cid}/purchase`, {}, reqConfig)
  }

  const signInGoogle = async () => {
    return axios.get('http://decorateme.onrender.com/api/session/current',
      reqConfig)
      .then(res => {
        setUser(res.data.response.user)
      })
      .catch(err => Swal.fire('Error', err.response.data.error, 'error'))
  }

  const forgotPassword = email => {
    return axios
      .post(
        'http://decorateme.onrender.com/api/session/forgot-password',
        { email }, reqConfig,
      )
  }

  const ableToReset = token => {
    return axios.get(`http://decorateme.onrender.com/api/session/reset-password/?token=${token}`,
      reqConfig
    )
  }

  const resetPassword = (password, confirmPassword) => {
    return axios.post(
      'http://decorateme.onrender.com/api/session/reset-password',
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