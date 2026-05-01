import express from 'express';
import { authenticateAdmin } from '../../middleware/auth.js';
import { createRoom, updateRoom, deleteRoom } from '../../controllers/admin/roomsAdminController.js';

const router = express.Router();
router.use(authenticateAdmin);
router.post('/', createRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
