import { Router } from 'express';
import { getItinerary, createItineraryBlock, updateItineraryBlock, deleteItineraryBlock } from '../controllers/itineraryController';
import { validateGroup } from '../middleware/auth';

const router = Router();

router.use(validateGroup);

router.get('/', getItinerary);
router.post('/', createItineraryBlock);
router.put('/:id', updateItineraryBlock);
router.delete('/:id', deleteItineraryBlock);

export default router;
