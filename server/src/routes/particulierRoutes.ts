import express from 'express';
import { 
  getParticulier, 
  createParticulier, 
  updateParticulier 
} from '../controllers/particulierController';

const router = express.Router();

// GET /particulier/:id - Get a particulier user by Cognito ID
router.get('/:cognitoId', getParticulier);

// POST /particulier - Create a new particulier user
router.post('/', createParticulier);

// PUT /particulier/:id - Update a particulier user
router.put('/:id', updateParticulier);

export default router;