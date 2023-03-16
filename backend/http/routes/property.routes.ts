import express from 'express';
import { isAuthenticated } from '../../utilities/isAuthenticated';
import imageUpload from '../../utilities/uploadImage';
import { PropertiesController } from '../controllers/properties.controller';

const router = express.Router();

const propertiesController = new PropertiesController();

router.post('/', isAuthenticated, imageUpload.array('images'), propertiesController.create);

router.get('/', isAuthenticated, propertiesController.findMany);
router.get('/:id', isAuthenticated, propertiesController.findById);

export default router;