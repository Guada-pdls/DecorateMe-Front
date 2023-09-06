import { Button } from "@mui/material"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const CustomButton = ({ text, url }) => {
  return (
    <Link to={url} href="#">
      <Button size='large' variant='contained' sx={{
        backgroundColor: 'wheat',
        textTransform: 'none',
        color: '#000',
        '&:hover': {
          backgroundColor: '#000',
          color: '#fff'
        }
      }}>{text}</Button>
    </Link>
  )
}

export default CustomButton