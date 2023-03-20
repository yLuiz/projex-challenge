"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const enviroments_1 = require("../environment/enviroments");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticated(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization)
        return res.status(401).json({
            message: "Token is missing!"
        });
    const token = authorization.split("Bearer ")[1];
    try {
        const isValidToken = jsonwebtoken_1.default.verify(token, enviroments_1.environments.JWT_SECRET);
        if (isValidToken)
            next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Token is invalid!"
        });
    }
}
exports.isAuthenticated = isAuthenticated;
