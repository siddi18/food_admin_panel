import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// Assignment routes
import adminUserRouter from "./routes/adminUserRoute.js"
import categoryRouter from "./routes/categoryRoute.js"
import productRouter from "./routes/productRoute.js"
import adminOrderRouter from "./routes/adminOrderRoute.js"
import dashboardRouter from "./routes/dashboardRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

// Assignment API endpoints
app.use("/api/users", adminUserRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", adminOrderRouter)
app.use("/api/dashboard", dashboardRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () =>{ console.log(`Server started on http://localhost:${port}`)
})


