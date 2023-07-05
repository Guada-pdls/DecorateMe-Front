import { useContext } from 'react'
import { SessionContext } from '../Context/SessionContext'
import { Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

const GithubWidget = () => {

	const { signInGH } = useContext(SessionContext)

	const loginHandler = () => {
		// github login
		signInGH()
		// window.location.href = 'http://localhost:8080/api/auth/github'
	}

	return (
		<Button fullWidth onClick={loginHandler} variant="outlined" sx={{ color: '#484848', margin: '1.2rem 0', borderColor: '#484848', ":hover": { borderColor: '#484848' } }} size="large" startIcon={<GitHubIcon sx={{ color: '#000' }} />}>
			Sign in with GitHub
		</Button>
	)
}

export default GithubWidget