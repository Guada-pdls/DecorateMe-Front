import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

const GoogleWidget = () => {
	const loginHandler = () => {
		// Google login
		window.location.href = 'http://decorateme.onrender.com/api/session/google'
	}

	return (
		<Button fullWidth onClick={loginHandler} variant="outlined" sx={{ color: '#484848', margin: '1.2rem 0', borderColor: '#484848', ":hover": { borderColor: '#484848' } }} size="large" startIcon={<GoogleIcon sx={{ color: '#000' }} />}>
			Sign in with Google
		</Button>
	)
}

export default GoogleWidget