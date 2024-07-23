import { Router } from 'express';
import {
  getAllMigraineTypes,
  addMigraineType,
  deleteMigraineType,
} from '../controllers/migraineTypeController';

const router = Router();

router.get('/', getAllMigraineTypes);
router.post('/', addMigraineType);
router.delete('/:id', deleteMigraineType);

export default router;
