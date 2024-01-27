import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bootcampData from './data/bootcamps.js';
import Bootcamp from './models/bootcampModel.js';

// ? Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Bootcamp.create(bootcampData);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error importing data: ${err.message}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await Bootcamp.deleteMany();
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
