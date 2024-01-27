import asyncHandler from '../middleware/asyncHandler.js';
import Bootcamp from '../models/bootcampModel.js';

// todo => get all bootcamps
//** routes => GET/api/v1/bootcamps
//? who can access this endpoint => Public

const getBootcamps = asyncHandler(async (req, res) => {
  let query;
  // ?
  const reqQuery = { ...req.query };

  //! fields to exclude
  const removeFields = ['select'];

  //? Loop over removeFields and delete them from reqQuery

  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);
  //? Create query string
  let queryStr = JSON.stringify(reqQuery);

  //? this is for filtering out greater than or less in mongo db documents
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //? Finding resources
  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//todo => get a single bootcamp
//** routes => GET/api/v1/bootcamps/:id
//? who can access this endpoint => Public

const getBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//todo => creates new bootcamp
//** routes => POST/api/v1/bootcamps
//? who can access this endpoint => Private

const createBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
    msg: 'New Bootcamp created',
  });
});

//todo => updates a bootcamp
//** routes => PUT/api/v1/bootcamps/:id
//? who can access this endpoint => Public

const updateBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  //! Makes sure bootcamp is there, so it won't alter something else

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//todo => deletes a bootcamp
//** routes => DELETE/api/v1/bootcamps/:id
//? who can access this endpoint => Private

const deleteBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  //! Makes sure bootcamp is there, so it won't delete something else

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
};
