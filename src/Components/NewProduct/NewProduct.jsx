import './NewProduct.css'

const NewProduct = () => {
    return (
        <form action="/api/products" method="POST">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" />
            <label htmlFor="price">Price</label>
            <input type="number" name="price" />
            <label htmlFor="thumbnail">Image</label>
            <input name="thumbnail" type="file" />
            <label htmlFor="code">Code</label>
            <input name="code" type="text" />
            <label htmlFor="stock">Stock</label>
            <input name="stock" type="number" />
            <input type="submit" />
        </form>
    )
}

export default NewProduct