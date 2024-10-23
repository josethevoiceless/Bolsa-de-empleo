import express from 'express';
import { 
  likePublicacion, 
  unlikePublicacion 
} from '../controllers/likeController.js';

const router = express.Router();

// Dar like a una publicación
router.post('/:id/like', likePublicacion);

// Quitar like de una publicación
router.delete('/:id/unlike', unlikePublicacion);

export default router;
