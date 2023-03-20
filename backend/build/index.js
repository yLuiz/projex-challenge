"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const property_routes_1 = __importDefault(require("./http/routes/property.routes"));
const user_routes_1 = __importDefault(require("./http/routes/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.json({
        message: 'Hello world!'
    });
});
app.use('/uploads', express_1.default.static('uploads'));
app.use('/user', user_routes_1.default);
app.use('/property', property_routes_1.default);
app.use((0, celebrate_1.errors)());
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    =====================================================
        🚀🚀 Running in http://localhost:${PORT} 🚀🚀
    =====================================================
    `);
});
