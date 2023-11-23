import express from 'express';
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotels,
  getHotel,
  updateHotel,
  getHotelRooms,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);
//GET SINGLE HOTEL
router.get('/find/:id', getHotel);
//GET ALL
router.get('/', getHotels);

//count by city
router.get('/countByCity', countByCity);

router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);

export default router;
