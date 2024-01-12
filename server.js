import express from 'express';
import dotenv from 'dotenv';
import bootcamps from './routes/bootcamps.js';

dotenv.config();

// initialize express app
const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
