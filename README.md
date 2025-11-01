# 🍕 Food Delivery Admin Panel

A comprehensive MERN Stack admin panel for managing food delivery operations including users, categories, products, orders, and real-time analytics dashboard.

## 📋 Project Overview

This project is a full-featured admin panel built as part of a machine test assignment. It demonstrates complete CRUD operations, MongoDB aggregation pipelines, and Mongoose populate functionality for managing a food delivery platform.

## ✨ Features

### 🎯 Dashboard
- Real-time statistics using MongoDB aggregation pipeline
- Total users count
- Total products count
- Total orders count
- Total revenue calculation using `$sum` aggregator
- Auto-updates when data changes

### 👥 Users Management
- View all users in a table
- Add new users (name, email, mobile)
- Edit existing user details
- Delete users with custom confirmation modal
- Form validation

### 📂 Categories Management
- View all product categories
- Create new categories (name, description)
- Update category information
- Delete categories (with confirmation)
- Used as reference in products

### 📦 Products Management
- View all products with populated category names
- Add products with category selection
- Edit product details (name, category, price, status)
- Status management (available/out of stock)
- Delete products with confirmation
- **Demonstrates Mongoose populate()** for category references

### 🛒 Order Creation
- Create orders with user selection
- Add multiple items to single order
- Auto-calculate total amount
- Product quantity management
- **Demonstrates nested document arrays** in MongoDB
- Stores complete order history with timestamps

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool & dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **CSS3** - Styling

## 📁 Project Structure

```
Food_delivery_app-main/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── adminUserController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── adminOrderController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── adminUserModel.js
│   │   ├── categoryModel.js
│   │   ├── productModel.js
│   │   └── adminOrderModel.js
│   ├── routes/
│   │   ├── adminUserRoute.js
│   │   ├── categoryRoute.js
│   │   ├── productRoute.js
│   │   ├── adminOrderRoute.js
│   │   └── dashboardRoute.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   └── ConfirmModal/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Users/
│   │   │   ├── Categories/
│   │   │   ├── Products/
│   │   │   └── OrderCreate/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── DEMO_SCRIPT.md
└── README.md
```

## 🚀 API Endpoints

### Users APIs
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Categories APIs
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products APIs
- `GET /api/products` - Get all products (with populated category)
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders APIs
- `POST /api/orders` - Create new order

### Dashboard APIs
- `GET /api/dashboard` - Get aggregated statistics

**Total: 13 RESTful API Endpoints**

## 📊 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  mobile: String (required),
  timestamps: true
}
```

### Category Schema
```javascript
{
  name: String (required, unique),
  description: String (required),
  timestamps: true
}
```

### Product Schema
```javascript
{
  name: String (required),
  categoryId: ObjectId (ref: 'category', required),
  price: Number (required),
  status: String (enum: ['available', 'out of stock'], default: 'available'),
  timestamps: true
}
```

### Order Schema
```javascript
{
  userId: ObjectId (ref: 'adminUser', required),
  items: [{
    productId: ObjectId (ref: 'product', required),
    quantity: Number (required),
    price: Number (required)
  }],
  totalAmount: Number (required),
  orderDate: Date (default: Date.now),
  timestamps: true
}
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/siddi18/food_admin_panel.git
cd food_admin_panel
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Add the following variables:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

**Backend .env example:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fooddelivery
JWT_SECRET=your_jwt_secret_key_here
PORT=4000
```

### 3. Admin Panel Setup

```bash
# Navigate to admin folder
cd ../admin

# Install dependencies
npm install

# Create .env file
# Add the following variable:
VITE_API_URL=http://localhost:4000
```

**Admin .env example:**
```env
VITE_API_URL=http://localhost:4000
```

### 4. Seed Sample Data (Optional)

```bash
# From backend folder
cd backend
node seed.js
```

This will populate your database with:
- 8 sample users
- 7 product categories
- 24 products across different categories
- 7 sample orders

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm run server
```
Server will run on: `http://localhost:4000`

### Start Admin Panel
```bash
cd admin
npm run dev
```
Admin panel will run on: `http://localhost:5173` or `http://localhost:5174`

### Access the Application
Open your browser and navigate to the admin panel URL. You should see the login page or dashboard.

## 🎯 Key Features Demonstrated

### 1. MongoDB Aggregation Pipeline
Located in `backend/controllers/dashboardController.js`
```javascript
// Calculates total revenue using $sum aggregator
const totalRevenue = await adminOrderModel.aggregate([
  { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
]);
```

### 2. Mongoose Populate
Located in `backend/controllers/productController.js`
```javascript
// Populates category details in products
const products = await productModel.find({})
  .populate('categoryId', 'name description');
```

### 3. Nested Documents
Located in `backend/models/adminOrderModel.js`
```javascript
// Items array with nested product references
items: [{
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  quantity: Number,
  price: Number
}]
```

## 🎨 UI Features

- ✅ Responsive design
- ✅ Custom confirmation modals (not browser default)
- ✅ Toast notifications for user feedback
- ✅ Status badges with color coding
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Clean and professional interface

## 📝 Assignment Requirements Fulfilled

✅ **4 MongoDB Models** - adminUser, category, product, adminOrder  
✅ **13 RESTful APIs** - Complete CRUD operations  
✅ **MongoDB Aggregation** - Dashboard statistics  
✅ **Mongoose Populate** - Category in products  
✅ **5 Admin Pages** - Dashboard, Users, Categories, Products, Orders  
✅ **CRUD Operations** - All entities manageable  
✅ **Professional UI** - Custom components and styling  
✅ **Error Handling** - Proper validation and error messages  

## 🧪 Testing the Application

1. **Dashboard**: Verify all statistics are displayed correctly
2. **Users**: Test add, edit, delete operations
3. **Categories**: Test complete CRUD functionality
4. **Products**: 
   - Verify category dropdown populates
   - Check category name displays (not ID)
   - Test status changes
5. **Orders**: 
   - Create order with multiple items
   - Verify total calculation
   - Check dashboard updates after order creation

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct in `.env`
- Ensure MongoDB cluster is active
- Verify port 4000 is not in use

### Admin panel shows network errors
- Ensure backend is running on port 4000
- Check `VITE_API_URL` in admin `.env` file
- Verify CORS is enabled in backend

### Data not showing
- Run the seed script to populate sample data
- Check browser console for errors
- Verify API endpoints are responding

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "nodemon": "^2.0.22"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.11.0",
  "axios": "^1.4.0",
  "react-toastify": "^9.1.2"
}
```

## 🎥 Demo Video

A complete walkthrough of all features is available in the demo video, demonstrating:
- All CRUD operations
- MongoDB aggregation in dashboard
- Mongoose populate in products
- Order creation with nested documents
- Custom UI components

## 📄 License

This project is created for educational purposes as part of a machine test assignment.

## 👨‍💻 Author

**Siddhi**
- GitHub: [@siddi18](https://github.com/siddi18)
- Repository: [food_admin_panel](https://github.com/siddi18/food_admin_panel)


For any queries or issues, please create an issue in the GitHub repository or contact through GitHub.

---

**Built with ❤️ using MERN Stack**
