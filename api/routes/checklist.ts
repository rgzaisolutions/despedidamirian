import { Router } from 'express';
import { getChecklist, toggleChecklistItem } from '../controllers/checklistController.js';
import { validateGroup } from '../middleware/auth.js';

const router = Router();

router.use(validateGroup);

router.get('/', getChecklist);
router.put('/:id', toggleChecklistItem);

export default router;
