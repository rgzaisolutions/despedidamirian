import { Router } from 'express';
import { getChecklist, toggleChecklistItem } from '../controllers/checklistController';
import { validateGroup } from '../middleware/auth';

const router = Router();

router.use(validateGroup);

router.get('/', getChecklist);
router.put('/:id', toggleChecklistItem);

export default router;
