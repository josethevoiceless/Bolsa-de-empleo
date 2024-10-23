
import express from 'express';
import { getUserRecommendations } from '../controllers/recommendationController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/recommendations', authenticateToken, getUserRecommendations);

export { router };
export default router;

