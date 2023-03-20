"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enviroments_1 = require("../environment/enviroments");
function createJWT({ email, password, sub }) {
    const token = jsonwebtoken_1.default.sign({ email, password, sub }, enviroments_1.environments.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
}
exports.createJWT = createJWT;
;
