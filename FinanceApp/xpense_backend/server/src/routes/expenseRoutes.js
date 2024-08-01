import express from 'express';
import { add, remove, update, view } from '../controllers/expenseController.js';
import {auth} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/add',auth, add);
router.get('/view',auth, view);
router.post('/update',auth, update);
router.post('/delete',auth, remove);


export default router;
