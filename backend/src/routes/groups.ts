import { Router } from 'express';
import { createGroup, joinGroup } from '../controllers/groupController';

const router = Router();

router.post('/create', createGroup);
router.post('/join', joinGroup);

export default router;
