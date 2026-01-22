import { Router } from 'express';
import { getVotes, castVote } from '../controllers/voteController';
import { validateGroup } from '../middleware/auth';

const router = Router();

router.use(validateGroup);

router.get('/', getVotes);
router.post('/', castVote);

export default router;
