"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const createJWT_1 = require("../../utilities/createJWT");
const getUserByToken_1 = require("../../utilities/getUserByToken");
const user_services_1 = require("../services/user.services");
const userServices = new user_services_1.UserServices();
class UserController {
    constructor() { }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const login = yield userServices.login({ email, password });
            if (!login.token) {
                return res.status(login.status).json({ message: login.message });
            }
            return res.json({ token: login.token });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            const user = yield userServices.create({ email, name, password });
            if (!user)
                return res.status(422).json({
                    message: "Name, email and password is required."
                });
            const token = (0, createJWT_1.createJWT)({ email, password, sub: user.id });
            return res.json({
                token,
                user
            });
        });
    }
    findOneByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.query;
            const user = yield userServices.findByEmail(String(email));
            if (!user)
                return res.status(404).json({
                    message: "User not found!"
                });
            return res.json({ user: Object.assign(Object.assign({}, user), { password: undefined }) });
        });
    }
    findOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userServices.findById(Number(id));
            if (!user)
                return res.status(404).json({
                    message: "User not found!"
                });
            return res.json({ user: Object.assign(Object.assign({}, user), { password: undefined }) });
        });
    }
    updateByToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization.split("Bearer ")[1];
            const user = (0, getUserByToken_1.getUserByToken)(token);
            const { name, email, password } = req.body;
            const updatedUser = yield userServices.update({ id: Number(user.sub), name, email, password });
            return res.json(updatedUser);
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userServices.deleteById(Number(id));
            if (!user)
                return res.status(404).json({
                    message: "User not found!"
                });
            return res.status(200).json();
        });
    }
}
exports.UserController = UserController;
