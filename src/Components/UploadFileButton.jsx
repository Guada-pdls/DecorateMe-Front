import { CloudUpload } from '@mui/icons-material'
import { Button, styled } from '@mui/material'

// eslint-disable-next-line react/prop-types
const UploadFileButton = ({ setFile, name, fullWidth }) => {
	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	});
	return (
		<Button sx={{
			color: 'black',
			marginBottom: '12px'
		}}
		fullWidth={fullWidth} component="label" variant="text" startIcon={<CloudUpload />}>
			Upload file
			<VisuallyHiddenInput onChange={e => setFile(e.target.files[0])} name={name} type="file" />
		</Button>
	)
}

export default UploadFileButton