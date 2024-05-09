import express from 'express';
import {
    addUsers, authAdmin, deleteUsers, getUserProfile,
    getUsers, logoutAdmin, updateUserProfile,activationUser
} from '../controllers/adminController.js';
import { protect } from '../middleware/adminAuthMiddleware.js';
import { userImage } from "../config/multer.js";

const router = express.Router();

router.post('/auth', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/employeeList', protect, getUsers);
router.post('/createEmployee', protect, userImage.single("file"), addUsers);
router.get('/editEmployee/:id', protect, getUserProfile);
router.put('/editEmployee', protect, userImage.single("file"), updateUserProfile);
router.delete('/deleteEmployee/:id', protect, deleteUsers);
router.patch('/activationUser', protect, activationUser);

export default router;
