import Swal from "sweetalert2";
import "./NewProduct.css";
import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../../Context/SessionContext";

const NewProduct = () => {

  const context = useContext(SessionContext)

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
  
      const formData = new FormData(e.currentTarget);
  
      const res = await axios.post('http://localhost:8080/api/products', {
        name: formData.get("name"),
        description: formData.get("description"),
        category: formData.get("category"),
        price: formData.get("price"),
        thumbnail: formData.get('thumbnail'),
        stock: formData.get('stock')
      },{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (res.status === 201) {
        Swal.fire({
          title: "Product created successfully",
          icon: "success",
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: "Go to products",
        }).then((res) => {
          if (res.isConfirmed) {
            e.target.reset();
            window.location.href = "http://localhost:5173/products";
          }
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `Error ${err.response.data.status}: ${err.response.data.response}`,
        icon: "error",
      });
    }
  };

  return (
    context.user?.role === 1 ? 
    <form
      onSubmit={(e) => submitHandler(e)}
      action="http://localhost:8080/api/products"
      method="POST"
    >
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <label htmlFor="description">Description</label>
      <input type="text" name="description" />
      <label htmlFor="category">Category</label>
      <input name="category" type="text" />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" />
      <label htmlFor="thumbnail">Image</label>
      <input name="thumbnail" type="text" />
      <label htmlFor="stock">Stock</label>
      <input name="stock" type="number" />
      <input type="submit" />
    </form>
    : 'Not Authorized'
  );
};

export default NewProduct;
