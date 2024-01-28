import asyncHandler from '../middleware/asyncHandler.js';
import courseModel from '../models/courseModel.js';
//todo => get courses
//** routes => GET/api/v1/bootcamps/courses
//** routes => GET/api/v1/bootcamps/:bootcampId/courses
//? who can access this endpoint => Public

const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});
