import express from 'express';
import { PropertiesController } from '../controllers/properties.controller';

const router = express.Router();

const propertiesController = new PropertiesController();

router.get('/properties', propertiesController.findMany);

export default router;