import { useEffect, useState } from 'react';
import './Products.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

// eslint-disable-next-line react/prop-types
const Products = ({ url }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    status: 'available'
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/products`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/categories`);
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await axios.put(`${url}/api/products/${currentProduct}`, formData);
        if (response.data.success) {
          toast.success("Product updated successfully");
          fetchProducts();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${url}/api/products`, formData);
        if (response.data.success) {
          toast.success("Product added successfully");
          fetchProducts();
        } else {
          toast.error(response.data.message);
        }
      }
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProduct(product._id);
    setFormData({
      name: product.name,
      categoryId: product.categoryId._id,
      price: product.price,
      status: product.status
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${url}/api/products/${deleteProductId}`);
      if (response.data.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', categoryId: '', price: '', status: 'available' });
    setShowForm(false);
    setEditMode(false);
    setCurrentProduct(null);
  };

  return (
    <div className='products-page'>
      <div className="products-header">
        <h2>Products Management</h2>
        <button onClick={() => setShowForm(!showForm)} className='add-btn'>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <button type="submit" className='submit-btn'>
            {editMode ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      <div className="products-table">
        <div className="table-header">
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Status</b>
          <b>Actions</b>
        </div>
        {products.map((product, index) => (
          <div key={index} className='table-row'>
            <p>{product.name}</p>
            <p>{product.categoryId.name}</p>
            <p>₹{product.price}</p>
            <p>
              <span className={`status-badge ${product.status}`}>
                {product.status}
              </span>
            </p>
            <div className="actions">
              <button onClick={() => handleEdit(product)} className='edit-btn'>Edit</button>
              <button onClick={() => handleDelete(product._id)} className='delete-btn'>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default Products;
