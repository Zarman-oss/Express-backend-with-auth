import mongoose from 'mongoose';

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, "Name can't be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [50, 'Name cant be more than 50 characters'],
  },
  website: {
    type: String,
    match: [
      /^https:\/\/\S+$/,
      'Please enter a valid website URL starting with "https://"',
    ],
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },

  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  career: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be least 1'],
    max: [10, 'Rating must can not be more than 10'],
  },
  averageCost: {
    type: Number,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
});
