import { Router } from 'express';
import { getFPLData } from '../controllers/fplApiController';

const router = Router();

router.get('/', getFPLData);

export default router;
