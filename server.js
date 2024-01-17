import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bootcamps from './routes/bootcamps.js'; 
import connectDB from './config/db.js'; 
import colors from 'colors'; 

const PORT = process.env.PORT || 5000;
dotenv.config(); 
connectDB();

// initialize express app
const app = express(); 

// Dev logging middleware
if(process.env.NODE_ENV=== 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);


app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold));
 
// //unhandled promise rejections 
// app.use((req, res, next) => {
//     process.on('unhandledRejection', (reason, promise) => {
//         console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//         // You can log the error, send an email, or perform other error-handling tasks here
//     });
//     next();
// });