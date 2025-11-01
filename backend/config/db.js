import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("DB Connected"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
//mongodb+srv://taffazzul:T145800@cluster0.fp37mli.mongodb.net/Food_delivery_app