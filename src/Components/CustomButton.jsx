import { Button } from "@mui/material"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const CustomButton = ({ text, url, uppercase, fullWidth, featuredCategories, type }) => {

  const button = <Button type={type ?? 'text'} size='large' fullWidth={fullWidth} variant='contained' sx={{
    padding: '.5rem 1rem',
    backgroundColor: 'wheat',
    textTransform: uppercase ? 'uppercase' : 'none',
    color: '#000',
    position: featuredCategories && 'absolute',
    bottom: featuredCategories && '10px',
    right: featuredCategories && '10px',
    minWidth: featuredCategories && '130px',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff'
    }
  }}>{text}</Button>

  return (
    url ? 
      <Link to={url}>
        {button}
      </Link >
      : button      
  )
}

export default CustomButton