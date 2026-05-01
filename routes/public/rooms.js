import express from 'express';
import { getAllRooms } from '../../controllers/public/roomsController.js';
const router = express.Router();
router.get('/', getAllRooms);
export default router;
