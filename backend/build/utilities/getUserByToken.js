"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUserByToken(token) {
    const payload = jsonwebtoken_1.default.decode(token);
    return payload;
}
exports.getUserByToken = getUserByToken;
