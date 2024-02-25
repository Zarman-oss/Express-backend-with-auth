import mongoose from 'mongoose';
import asyncHandler from '../middleware/asyncHandler.js';
import Course from '../models/courseModel.js';
import ErrorResponse from '../utils/errorResponse.js';

const getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    // Validate if the bootcampId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.bootcampId)) {
      return next(new ErrorResponse('Invalid Bootcamp ID', 400));
    }

    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  if (!courses || courses.length === 0) {
    return next(new ErrorResponse('No courses found', 404));
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export { getCourses };
