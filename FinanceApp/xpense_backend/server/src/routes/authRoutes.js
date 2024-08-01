import express from 'express';
import { signup, signin, users, updateuser, deleteuser, viewUserExpense, updateUserExpense, deleteUserExpense } from '../controllers/authController.js';
import {auth} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users', auth,  users);
router.post('/update', auth, updateuser);
router.post('/delete', auth, deleteuser);
router.get('/viewUserExpense',auth, viewUserExpense);
router.post('/updateUserExpense',auth, updateUserExpense);
router.post('/deleteUserExpense',auth, deleteUserExpense);
export default router;
