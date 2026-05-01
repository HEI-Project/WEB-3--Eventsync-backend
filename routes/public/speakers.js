import express from 'express';
import { getAllSpeakers, getSpeakerById, getSpeakerSessionQuestions } from '../../controllers/public/speakersController.js';

const router = express.Router();
router.get('/', getAllSpeakers);
router.get('/:id', getSpeakerById);
router.get('/:id/questions', getSpeakerSessionQuestions);

export default router;
