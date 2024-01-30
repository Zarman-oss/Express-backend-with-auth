import { populate } from 'dotenv';
import asyncHandler from '../middleware/asyncHandler.js';
import Bootcamp from '../models/bootcampModel.js';
// import ErrorResponse from '../utils/errorResponse.js';

// todo => get all bootcamps
//** routes => GET/api/v1/bootcamps
//? who can access this endpoint => Public

const getBootcamps = asyncHandler(async (req, res) => {
  let query;
  //?
  const reqQuery = { ...req.query };

  //! fields to exclude
  const removeFields = ['select', 'sort', 'limit'];

  //! Loop over removeFields and delete them from reqQuery

  removeFields.forEach((param) => delete reqQuery[param]);

  //! Create query string
  let queryStr = JSON.stringify(reqQuery);

  //! this is for filtering out greater than or less in mongo db documents
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //! Finding resources
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  //! Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  //! sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //! Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //* Execute query
  const bootcamps = await query;

  //! Pagination result

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    pagination: pagination,
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

  // if (!bootcamp) {
  //   return next(
  //     new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  //   );
  // }

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

const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  //! Makes sure bootcamp is there, so it won't delete something else

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  bootcamp.remove();

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
