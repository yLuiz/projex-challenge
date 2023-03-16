import express from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../../utilities/utilities';

const router = express.Router();

const userController = new UserController();

router.post('/user', userController.create);
router.post('/auth', userController.login);

router.put('/user', isAuthenticated, userController.updateByToken); // 📛📛 Ainda não está pronta, devo terminar. 📛📛
router.get('/user', isAuthenticated, userController.findOneByEmail);
router.get('/user/:id', isAuthenticated, userController.findOneById);
router.delete('/user/:id', isAuthenticated, userController.deleteById);

export default router;