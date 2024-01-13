import express from 'express'; 
import { getBootcamps, getSingleBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } from '../controllers/bootcamps';

const router = express.Router();
 
router.route('/').get(getBootcamps).post(createBootcamp); 
 
router.route('/:id').get(getBootcamps).put(updateBootcamp).delete(deleteBootcamp);
  






export default router;
