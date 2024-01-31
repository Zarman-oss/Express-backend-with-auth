import asyncHandler from '../middleware/asyncHandler.js';
import Course from '../models/courseModel.js';

//todo => get courses
//** routes => GET/api/v1/bootcamps/courses
//** routes => GET/api/v1/bootcamps/:bootcampId/courses
//? who can access this endpoint => Public
const getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export { getCourses };
