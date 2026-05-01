import express from 'express';
import { authenticateAdmin } from '../../middleware/auth.js';
import { createSpeaker, updateSpeaker, deleteSpeaker } from '../../controllers/admin/speakersAdminController.js';
const router = express.Router();
router.use(authenticateAdmin);
router.post('/', createSpeaker);
router.put('/:id', updateSpeaker);
router.delete('/:id', deleteSpeaker);
export default router;
