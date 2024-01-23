import Bootcamp from '../models/bootcampModel.js';

/**
 * todo  => get all bootcamps
 ** routes => GET/api/v1/bootcamps
 * ? who can access this endpoint => Public
 */
const getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      data: bootcamps,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

/**
 * todo  => get a single bootcamp
 ** routes => GET/api/v1/bootcamps/:id
 * ? who can access this endpoint => Public
 */

const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
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

const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    /**
     * ! Makes sure bootcamp is there, so it won't alter something else
     */

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

/**
 * todo => deletes a bootcamp
 ** routes => DELETE/api/v1/bootcamps/:id
 * ? who can access this endpoint => Private
 */

const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    /**
     * ! Makes sure bootcamp is there, so it won't delete something else
     */

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
    });
  }
};

export {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
};
