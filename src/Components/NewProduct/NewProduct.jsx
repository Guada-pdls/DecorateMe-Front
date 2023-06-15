import './NewProduct.css'

const NewProduct = () => {
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e.target.elements)
    }
    return (
        <form onSubmit={(e) => submitHandler(e)}>
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