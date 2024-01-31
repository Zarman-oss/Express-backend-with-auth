import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import bootcamps from './routes/bootcamps.js';
import courses from './routes/courses.js';

const PORT = process.env.PORT || 5000;

//? Load environment variables from .env file since I have my .env file in root

dotenv.config();
connectDB();

//? initialize express app
const app = express();

//* Body Parser
app.use(express.json());

//* Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//* Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

//? for better error response
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);
