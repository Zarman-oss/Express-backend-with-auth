import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import Bootcamp from './models/bootcampModel.js';

// ?Load environment variables from .env file since I have my .env file in root

dotenv.config();

// ?Load models

// *Connect to data base
mongoose.connect(process.env.MONGO_URI);

//?read and parse the json files

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname} /_data/ bootcamps.json`, 'utf-8')
);

// ? To import data to db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported...'.green.inverse);
  } catch (err) {
    console.log(err);
  }
};
// ? To delete data in db
const deleteData = async () => {
  try {
    await bootcamp.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
