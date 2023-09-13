import { Button } from "@mui/material"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const CustomButton = ({ text, url, uppercase, featuredCategories }) => {
  return (
    <Link to={url}>
      <Button size='large' variant='contained' sx={{
        padding: '.5rem 1rem',
        backgroundColor: 'wheat',
        fontWeight: 'bold',
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
    </Link >
  )
}

export default CustomButton