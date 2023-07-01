require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT= process.env.PORT || 5000;

const products_route = require("./routes/products")

app.get("/",(req,res)=>{
    res.send("Hi, I am express")
})

// middleware
app.use("/api/products",products_route)

const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT,()=>{
            console.log(`${PORT} ,I am Connected`);
        });
    }catch(error){
        console.log(error);
    }
};

start();