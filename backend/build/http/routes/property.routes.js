"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = require("../../utilities/isAuthenticated");
const uploadImage_1 = __importDefault(require("../../utilities/uploadImage"));
const properties_controller_1 = require("../controllers/properties.controller");
const router = express_1.default.Router();
const propertiesController = new properties_controller_1.PropertiesController();
router.post('/', isAuthenticated_1.isAuthenticated, uploadImage_1.default.array('images'), propertiesController.create);
router.put('/:id', isAuthenticated_1.isAuthenticated, uploadImage_1.default.array('images'), propertiesController.update);
router.get('/', isAuthenticated_1.isAuthenticated, propertiesController.findMany);
router.get('/:id', isAuthenticated_1.isAuthenticated, propertiesController.findById);
router.delete('/:id', isAuthenticated_1.isAuthenticated, propertiesController.deleteById);
router.delete('/', isAuthenticated_1.isAuthenticated, propertiesController.deleteAll);
exports.default = router;
