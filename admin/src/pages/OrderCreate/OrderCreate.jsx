import { useEffect, useState } from 'react';
import './OrderCreate.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderCreate = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    items: []
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/users`);
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching users");
    }
  };

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

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const addItem = () => {
    if (!selectedProduct || quantity <= 0) {
      toast.error("Please select a product and valid quantity");
      return;
    }

    const product = products.find(p => p._id === selectedProduct);
    const newItem = {
      productId: product._id,
      productName: product.name,
      quantity: parseInt(quantity),
      price: product.price
    };

    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });

    setSelectedProduct('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId) {
      toast.error("Please select a user");
      return;
    }

    if (formData.items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    try {
      const orderData = {
        userId: formData.userId,
        items: formData.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await axios.post(`${url}/api/orders`, orderData);
      if (response.data.success) {
        toast.success("Order created successfully");
        setFormData({ userId: '', items: [] });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating order");
    }
  };

  return (
    <div className='order-create-page'>
      <h2>Create New Order</h2>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-section">
          <h3>Select User</h3>
          <select
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            required
          >
            <option value="">Choose User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <h3>Add Products</h3>
          <div className="add-product-row">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.filter(p => p.status === 'available').map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} - ₹{product.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
            <button type="button" onClick={addItem} className="add-item-btn">
              + Add Item
            </button>
          </div>
        </div>

        {formData.items.length > 0 && (
          <div className="order-items">
            <h3>Order Items</h3>
            <div className="items-table">
              <div className="items-header">
                <b>Product</b>
                <b>Price</b>
                <b>Quantity</b>
                <b>Subtotal</b>
                <b>Action</b>
              </div>
              {formData.items.map((item, index) => (
                <div key={index} className="item-row">
                  <p>{item.productName}</p>
                  <p>₹{item.price}</p>
                  <p>{item.quantity}</p>
                  <p>₹{item.price * item.quantity}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="order-total">
              <h3>Total Amount: ₹{calculateTotal()}</h3>
            </div>
          </div>
        )}

        <button type="submit" className="submit-order-btn">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default OrderCreate;
