import express from 'express';
import { userImage } from "../config/multer.js";
import { protect } from '../middleware/authMiddleware.js';
import {
    authUser,
    registerUser, 
    updateUserProfile,
    getUserProfile,
    logoutUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/',registerUser)
router.post('/auth', authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect,userImage.single("file"),updateUserProfile)

export default router