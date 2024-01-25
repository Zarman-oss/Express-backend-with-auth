// import mongoose from 'mongoose';
// import colors from 'colors';
// import path from 'path';
// import dotenv from 'dotenv';
// import Bootcamp from './models/bootcampModel.js';
// import bootcampData from './data/bootcamps.js';

// // ?Load environment variables from .env file
// dotenv.config();

// // ?Connect to the database
// mongoose.connect(process.env.MONGO_URI);

// // ?Function to import data to the database
// const importData = async () => {
//   try {
//     await Bootcamp.create(bootcampData); // Fixed typo (bootcamps -> bootcampData)
//     console.log('Data Imported...'.green.inverse);
//   } catch (err) {
//     console.error(err);
//   }
// };

// // ?Function to delete data in the database
// const deleteData = async () => {
//   try {
//     await Bootcamp.deleteMany();
//     console.log('Data Destroyed...'.red.inverse);
//   } catch (err) {
//     console.error(err);
//   }
// };

// // ?Check command line arguments and perform actions accordingly
// if (process.argv[2] === '-i') {
//   importData();
// } else if (process.argv[2] === '-d') {
//   deleteData();
// }
import mongoose from 'mongoose';
import colors from 'colors';
import path from 'path';
import dotenv from 'dotenv';
import Bootcamp from './models/bootcampModel.js';
import bootcampData from './data/bootcamps.js';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the database...'.cyan.inverse);
  } catch (err) {
    console.error(
      `Error connecting to the database: ${err.message}`.red.inverse
    );
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Bootcamp.create(bootcampData);
    console.log('Data Imported...'.green.inverse);
  } catch (err) {
    console.error(`Error importing data: ${err.message}`.red.inverse);
  } finally {
    mongoose.connection.close();
  }
};

const deleteData = async () => {
  try {
    await connectDB();
    await Bootcamp.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
  } catch (err) {
    console.error(`Error deleting data: ${err.message}`.red.inverse);
  } finally {
    mongoose.connection.close();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
