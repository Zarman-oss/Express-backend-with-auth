import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bootcampData from './data/bootcamps.js';
import courseData from './data/courses.js';
import Bootcamp from './models/bootcampModel.js';
import colors from 'colors';
import Course from './models/courseModel.js';

// ? Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

//! import data to database
const importData = async () => {
  try {
    await Bootcamp.create(bootcampData);
    await Course.create(courseData);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error importing data: ${err.message}`.red.inverse);
  }
};
//! destroy data from database
const destroyData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error deleting data: ${err.message}`.red.inverse);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
