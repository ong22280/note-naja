import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get("/me", userController.getMe);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;
