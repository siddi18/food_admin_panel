import { useEffect, useState } from 'react';
import './Users.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

// eslint-disable-next-line react/prop-types
const Users = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

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

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await axios.put(`${url}/api/users/${currentUser}`, formData);
        if (response.data.success) {
          toast.success("User updated successfully");
          fetchUsers();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${url}/api/users`, formData);
        if (response.data.success) {
          toast.success("User added successfully");
          fetchUsers();
        } else {
          toast.error(response.data.message);
        }
      }
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error saving user");
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${url}/api/users/${deleteUserId}`);
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting user");
    }
    setShowDeleteModal(false);
    setDeleteUserId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', mobile: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentUser(null);
  };

  return (
    <div className='users-page'>
      <div className="users-header">
        <h2>Users Management</h2>
        <button onClick={() => setShowForm(!showForm)} className='add-btn'>
          {showForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className='submit-btn'>
            {editMode ? 'Update User' : 'Add User'}
          </button>
        </form>
      )}

      <div className="users-table">
        <div className="table-header">
          <b>Name</b>
          <b>Email</b>
          <b>Mobile</b>
          <b>Actions</b>
        </div>
        {users.map((user, index) => (
          <div key={index} className='table-row'>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.mobile}</p>
            <div className="actions">
              <button onClick={() => handleEdit(user)} className='edit-btn'>Edit</button>
              <button onClick={() => handleDelete(user._id)} className='delete-btn'>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};

export default Users;
