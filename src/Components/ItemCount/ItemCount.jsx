/* eslint-disable react/prop-types */
import { useState } from "react";

const ItemCount = ({ product, addToCart }) => {
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

  const handleClick = () => {
    addToCart("648a0049c5392c5c08014dc6", product._id, units);
    setUnits(1);
    setAddBtn("Added to Cart");
  };

  return (
    <>
      <div className="productQuantity">
        <p>Cantidad:</p>
        <div className="productQuantity-counter">
          <button className="productBtn subBtn" onClick={sub}>
            -
          </button>
          <p className="counter">
            {units === product.stock ? `${units} Max` : units}
          </p>
          <button className="productBtn sumBtn" onClick={sum}>
            +
          </button>
        </div>
      </div>
      <button className="btn addBtn" value={product._id} onClick={handleClick}>
        {addBtn}
      </button>
    </>
  );
};

export default ItemCount;
