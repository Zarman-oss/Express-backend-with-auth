import express from 'express';
import {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
} from '../controllers/bootcamps.js';
import courseRouter from '../routes/courses.js';

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamp);

//! Re-route into other routes
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

export default router;
