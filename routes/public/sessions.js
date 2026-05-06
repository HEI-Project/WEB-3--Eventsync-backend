import express from 'express';
import { getAll, getSessionById, getSessionQuestions, submitQuestion, upvoteQuestion } from '../../controllers/public/sessionsController.js';
const router = express.Router();
router.get('/:id', getSessionById);
router.get('/', getAll);
router.get('/:id/questions', getSessionQuestions);
router.post('/:id/questions', submitQuestion);
router.post('/questions/:questionId/upvote', upvoteQuestion);
export default router;
