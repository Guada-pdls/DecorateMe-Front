import { Alert, Snackbar } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Toast = ({ msg, severity, open }) => {
	return (
		<>
      <Snackbar
        open={open}
        autoHideDuration={6000}
      >
				<Alert severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
			</Snackbar>
		</>
	)
}

export default Toast