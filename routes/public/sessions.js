import express from 'express';
import rateLimit from 'express-rate-limit';
import { getAllSessions, getSessionById, getSessionQuestions, submitQuestion, upvoteQuestion } from '../../controllers/public/sessionsController.js';

const router = express.Router();

const upvoteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Trop de tentatives. Veuillez réessayer dans une minute.' }
});

router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.get('/:id/questions', getSessionQuestions);
router.post('/:id/questions', submitQuestion);
router.post('/questions/:questionId/upvote', upvoteLimiter, upvoteQuestion);
export default router;
