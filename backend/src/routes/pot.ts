import { Router } from 'express';
import { getPot, addExpense } from '../controllers/potController';
import { validateGroup } from '../middleware/auth';

const router = Router();

router.use(validateGroup);

router.get('/', getPot);
router.post('/expense', addExpense);

export default router;
