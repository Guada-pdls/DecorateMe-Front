/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";

const ProductCard = ({ product }) => {
  const mobile = useMediaQuery('(max-width: 576px)')
  return (
    <Link style={{ textDecoration: 'none' }} to={"/products/" + product._id}>
      <Box component='article' className="productCard" sx={{ maxWidth: mobile ? '280px' : '360px' }}>
        <Box component='img'
          sx={{
            width: '100%',
            height: mobile ? '280px' : '360px',
            objectFit: 'cover',
            borderRadius: '20px'
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s"
          alt={product.name}
        />
        <Typography variant="h5" sx={{ color: 'black' }}>{product.name}</Typography>
        <Typography sx={{ color: 'gray' }}>{product.category}</Typography>
        <Typography sx={{
          marginTop: '10px',
          fontWeight: 'bold',
          color: 'black',
          letterSpacing: '1px',
          fontSize: '18px'
        }}>{product.price} €</Typography>
      </Box>
    </Link>
  );
};

export default ProductCard;
