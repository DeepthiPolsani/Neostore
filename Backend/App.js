const express=require('express');
const cors = require('cors');
const port =8899;
const app=express()
const passport = require("passport");
const cookieSession = require("cookie-session");
const path=require('path')
const userRoutes=require('./routes/userRoutes')
const profileRoutes=require('./routes/profileRoutes')
const productRoutes=require('./routes/productRoutes')
const categoryRoutes=require('./routes/categoryRoutes')
const orderRoutes=require('./routes/orderRoutes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, "./public/")));


const connectDB=require('./config/db')
connectDB()



app.use('/api/neostore',userRoutes)
app.use('/api/neostore',profileRoutes)
app.use('/api/neostore',productRoutes)
app.use('/api/neostore',categoryRoutes)
app.use('/api/neostore',orderRoutes)

app.listen(port,(err)=>{
    if(err) throw err
    console.log(`Work on ${port}`)
})