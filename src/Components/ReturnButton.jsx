import { Box, IconButton } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

const ReturnButton = () => {
	return (
		<Box sx={{ position: 'absolute' }} onClick={() => window.history.back()}>
			<IconButton>
				<ArrowBack sx={{ color: 'black' }} />
			</IconButton>
		</Box>
	)
}

export default ReturnButton