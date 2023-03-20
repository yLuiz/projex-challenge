"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const isAuthenticated_1 = require("../../utilities/isAuthenticated");
const router = express_1.default.Router();
const userController = new user_controller_1.UserController();
router.post('/', userController.create);
router.post('/auth', userController.login);
router.put('/', isAuthenticated_1.isAuthenticated, userController.updateByToken);
router.get('/', isAuthenticated_1.isAuthenticated, userController.findOneByEmail);
router.get('/:id', isAuthenticated_1.isAuthenticated, userController.findOneById);
router.delete('/:id', isAuthenticated_1.isAuthenticated, userController.deleteById);
exports.default = router;
