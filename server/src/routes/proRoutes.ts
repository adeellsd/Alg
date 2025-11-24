import express from 'express';
import { 
  getPro, 
  createPro, 
  updatePro 
} from '../controllers/proController';

const router = express.Router();

// GET /pro/:id - Get a pro user by Cognito ID
router.get('/:id', getPro);

// POST /pro - Create a new pro user
router.post('/', createPro);

// PUT /pro/:id - Update a pro user
router.put('/:id', updatePro);

export default router;
