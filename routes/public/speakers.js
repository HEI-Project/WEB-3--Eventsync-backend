import express from 'express';
import { getAllSpeakers, getSpeakerById } from '../../controllers/public/speakersController.js';
const router = express.Router();
router.get('/', getAllSpeakers);
router.get('/:id', getSpeakerById);
export default router;
