import express from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../../utilities/isAuthenticated';
const router = express.Router();

const userController = new UserController();

router.post('/', userController.create);
router.post('/auth', userController.login);

router.put('/', isAuthenticated, userController.updateByToken);
router.get('/', isAuthenticated, userController.findOneByEmail);
router.get('/:id', isAuthenticated, userController.findOneById);
router.delete('/:id', isAuthenticated, userController.deleteById);

export default router;