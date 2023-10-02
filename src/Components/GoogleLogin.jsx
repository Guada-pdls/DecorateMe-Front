import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import Load from './Load'
import { Navigate } from 'react-router-dom'

const GoogleLogin = () => {

	const [load, setLoad] = useState(true)
	const { signInGoogle } = useContext(UserContext)
	
	useEffect(() => {
		signInGoogle()
		.finally(setLoad(false))
	}, [])
	return (
		load ? <Load/> : <Navigate to='/'/>
	)
}

export default GoogleLogin