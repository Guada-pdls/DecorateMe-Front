/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={"/products/" + product._id}>
      <Card sx={{ maxWidth: 350 }}>
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
        <Button size="small">View More</Button>
      </CardActions>
    </Card>
    </Link>
  );
};

export default ProductCard;
