const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const setGlobalMiddleware = require('./middlewares/globalMiddlewares');


const app = express();
const port = process.env.PORT || 1338;

//connect to database
connectDB();

//middleware
setGlobalMiddleware(app);

//routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));
app.use('/api/user', require('./routes/user'))



//global error
// app.use((req,res,next)=>{
//     const error = new Error('Not found');
//     error.message = 'Invalid route';
//     error.status= 404;
//     next(error); // this calls the error handling middleware
// })

//error handing middleware
app.use((error,req,res,next)=>{
    return res.status(error.status || 500).json({error:{message:error.message}});
})



//serve
app.listen(port,()=>{
    console.log(`Server runs at Port : ${port}`);
});