import express from 'express';
import { authenticateAdmin } from '../../middleware/auth.js';
import { createSession, updateSession, deleteSession } from '../../controllers/admin/sessionsAdminController.js';

const router = express.Router();
router.use(authenticateAdmin);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;
