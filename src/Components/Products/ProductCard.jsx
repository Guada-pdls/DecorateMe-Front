/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery } from "@mui/material";

const ProductCard = ({ product }) => {
  const mobile = useMediaQuery('(max-width: 576px)')
  console.log(product)
  return (
    <Link style={{ textDecoration: 'none' }} to={"/products/" + product._id}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.thumbnail}
        title={product.name}
      />
      <CardContent>
        <Typography variant="subtitle">{product.category}</Typography>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      {/* <Box component='article' className="productCard" sx={{ maxWidth: mobile ? '280px' : '360px' }}>
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
      </Box> */}
    </Link>
  );
};

export default ProductCard;
