import { Router } from 'express';
import { getVotes, castVote } from '../controllers/voteController.js';
import { validateGroup } from '../middleware/auth.js';

const router = Router();

router.use(validateGroup);

router.get('/', getVotes);
router.post('/', castVote);

export default router;
