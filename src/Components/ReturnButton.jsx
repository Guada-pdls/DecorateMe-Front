import { Box, IconButton } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const ReturnButton = () => {
	const navigation = useNavigate()

	return (
		<Box sx={{ position: 'absolute' }} onClick={() => navigation(-1)}>
			<IconButton>
				<ArrowBack sx={{ color: 'black' }} />
			</IconButton>
		</Box>
	)
}

export default ReturnButton