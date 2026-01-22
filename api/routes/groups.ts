import { Router } from 'express';
import { joinGroup, createGroup } from '../controllers/groupController.js';

const router = Router();

router.post('/join', joinGroup);
router.post('/create', createGroup);

export default router;
