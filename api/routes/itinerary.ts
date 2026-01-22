import { Router } from 'express';
import { getItinerary, createItineraryBlock } from '../controllers/itineraryController.js';
import { validateGroup } from '../middleware/auth.js';

const router = Router();

router.use(validateGroup);

router.get('/', getItinerary);
router.post('/', createItineraryBlock);

export default router;
