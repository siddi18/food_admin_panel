import { useEffect, useState } from 'react';
import './Categories.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

// eslint-disable-next-line react/prop-types
const Categories = ({ url }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

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
        const response = await axios.put(`${url}/api/categories/${currentCategory}`, formData);
        if (response.data.success) {
          toast.success("Category updated successfully");
          fetchCategories();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${url}/api/categories`, formData);
        if (response.data.success) {
          toast.success("Category added successfully");
          fetchCategories();
        } else {
          toast.error(response.data.message);
        }
      }
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error saving category");
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCurrentCategory(category._id);
    setFormData({
      name: category.name,
      description: category.description
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteCategoryId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${url}/api/categories/${deleteCategoryId}`);
      if (response.data.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
    setShowDeleteModal(false);
    setDeleteCategoryId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentCategory(null);
  };

  return (
    <div className='categories-page'>
      <div className="categories-header">
        <h2>Categories Management</h2>
        <button onClick={() => setShowForm(!showForm)} className='add-btn'>
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Category Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
          />
          <button type="submit" className='submit-btn'>
            {editMode ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      )}

      <div className="categories-table">
        <div className="table-header">
          <b>Name</b>
          <b>Description</b>
          <b>Actions</b>
        </div>
        {categories.map((category, index) => (
          <div key={index} className='table-row'>
            <p>{category.name}</p>
            <p>{category.description}</p>
            <div className="actions">
              <button onClick={() => handleEdit(category)} className='edit-btn'>Edit</button>
              <button onClick={() => handleDelete(category._id)} className='delete-btn'>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
};

export default Categories;
