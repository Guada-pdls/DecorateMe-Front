/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IconButton, Typography, Box, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ItemCount = ({ product, addToCart, cart, able }) => {
  const [units, setUnits] = useState(1);
  const [addBtn, setAddBtn] = useState("Add to Cart");

  const sum = () => {
    if (units < product.stock) {
      setUnits(units + 1);
      setAddBtn("Add to Cart");
    }
  };

  const sub = () => {
    if (units > 1) {
      setUnits(units - 1);
      setAddBtn("Add to Cart");
    }
  };

  useEffect(() => {
    console.log(cart)
    console.log(able)
  })

  const handleClick = () => {
    addToCart("648a0049c5392c5c08014dc6", product._id, units);
    setUnits(1);
    setAddBtn("Added to Cart");
  };

  return (
    <>
      <Box sx={{ marginTop: '20px' }}>
        <Typography>Quantity:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 20px' }}>
          <IconButton onClick={sub}>
            <Remove sx={{ color: 'black' }}/>
          </IconButton>
          <Typography sx={{ padding: '0 20px' }}>
            {units === product.stock ? `${units} Max` : units}
          </Typography>
          <IconButton onClick={sum}>
            <Add sx={{ color: 'black' }}/>
          </IconButton>
        </Box>
      </Box>
      <Button variant="contained" sx={{ backgroundColor: 'wheat', color: 'black', ":hover": { backgroundColor: 'black'} }} fullWidth value={product._id} onClick={handleClick}>
        {addBtn}
      </Button>
    </>
  );
};

export default ItemCount;
