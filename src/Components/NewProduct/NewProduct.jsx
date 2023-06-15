import Swal from 'sweetalert2'
import './NewProduct.css'

const NewProduct = () => {
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(e.target)

        const formData = new FormData(e.target);
        const urlSearchParams = new URLSearchParams();

        for (const pair of formData) {
            urlSearchParams.append(pair[0], pair[1]);
        }

        const res = await fetch(e.target.action, {
            method: e.target.method,
            body: urlSearchParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = await res.json()

        if (data.success) {
            Swal.fire({
                title: 'Product created successfully',
                icon: 'success',
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonText: 'Go to products'
            }).then(res => {
                if (res.isConfirmed) {
                    e.target.reset()
                    window.location.href = 'http://127.0.0.1:5173/products'
                }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: `Error ${data.status}: ${data.response}`,
                icon: 'error'
            });
        }
    }


    return (
        <form onSubmit={(e) => submitHandler(e)} action="http://localhost:8080/api/products" method='POST'>
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
    )
}

export default NewProduct