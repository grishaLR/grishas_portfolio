import { Router } from 'express';
import {
  getAllMigraines,
  addMigraine,
  deleteMigraine,
  updateMigraine,
} from '../controllers/migraineController';

const router = Router();

router.get('/', getAllMigraines);
router.post('/', addMigraine);
router.delete('/:id', deleteMigraine);
router.patch('/:id', updateMigraine);

export default router;
