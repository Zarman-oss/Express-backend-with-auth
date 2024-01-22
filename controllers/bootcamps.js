import Bootcamp from '../models/bootcampModel.js';

/**
 * todo  => get all bootcamps
 ** routes => GET/api/v1/bootcamps
 * ? who can access this endpoint => Public
 */
const getBootcamps = (req, res) => { 
  try { 
    const bootcamps= await Bootcamp.find();
    
  } catch (error) {
    
  }
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
  });
};

/**
 * todo  => get a single bootcamp
 ** routes => GET/api/v1/bootcamps/:id
 * ? who can access this endpoint => Public
 */

const getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show single bootcamp ${req.params.id}`,
  });
};
/**
 * todo  => create new bootcamp
 ** routes => POST/api/v1/bootcamps
 * ?who can access this endpoint => Private
 */

const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
      msg: 'New Bootcamp created',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

/**
 * todo  => updates a bootcamp
 ** routes => PUT/api/v1/bootcamps/:id
 * ? who can access this endpoint => Public
 */

const updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update Bootcamp ${req.params.id}`,
  });
};

/**
 * todo => deletes a bootcamp
 ** routes => DELETE/api/v1/bootcamps/:id
 * ? who can access this endpoint => Private
 */

const deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Bootcamp deleted',
  });
};

export {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
};
