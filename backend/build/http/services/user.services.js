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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createJWT_1 = require("../../utilities/createJWT");
const prisma = new client_1.PrismaClient();
class UserServices {
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password)
                return {
                    status: 422,
                    message: "Email and password is required",
                    token: null
                };
            const user = yield this.findByEmail(email);
            if (!user) {
                return {
                    status: 401,
                    message: "Invalid credentials.",
                    token: null
                };
            }
            const validPassoword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassoword) {
                return {
                    status: 401,
                    message: "Invalid credentials.",
                    token: null
                };
            }
            const token = (0, createJWT_1.createJWT)({ email, password, sub: user.id });
            return {
                status: 200,
                message: "Authenticated",
                token
            };
        });
    }
    create({ email, password, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password)
                return null;
            const salt = yield bcrypt_1.default.genSalt(8);
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            const user = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findFirst({
                where: {
                    id
                }
            });
            if (!user)
                return null;
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user)
                return null;
            return user;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user)
                return null;
            yield prisma.user.delete({
                where: {
                    id
                }
            });
            return true;
        });
    }
    update({ id, email, name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findById(Number(id));
            if (!user)
                return null;
            if (name && name !== user.name) {
                user = Object.assign(Object.assign({}, user), { name });
            }
            if (email && email !== user.email) {
                user = Object.assign(Object.assign({}, user), { email });
            }
            const equalsPassword = password ? yield bcrypt_1.default.compare(password, user.password) : undefined;
            if (password && !equalsPassword) {
                const salt = yield bcrypt_1.default.genSalt(8);
                const hashPassword = yield bcrypt_1.default.hash(password, salt);
                user = Object.assign(Object.assign({}, user), { password: hashPassword });
            }
            yield prisma.user.update({
                where: {
                    id
                },
                data: user
            });
            return user;
        });
    }
}
exports.UserServices = UserServices;
