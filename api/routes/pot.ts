import { Router } from 'express';
import { getPot, addExpense } from '../controllers/potController.js';
import { validateGroup } from '../middleware/auth.js';

const router = Router();

router.use(validateGroup);

router.get('/', getPot);
router.post('/expense', addExpense);

export default router;
