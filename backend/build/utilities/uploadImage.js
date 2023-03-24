"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const imageRegex = /\.(jpg|png|jfif)$/;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";
        if (req.baseUrl.includes("property")) {
            folder = "properties";
        }
        else if (req.baseUrl.includes("something")) {
            folder = "something";
        }
        cb(null, `uploads/${folder}`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + node_path_1.default.extname(file.originalname));
    }
});
const imageUpload = (0, multer_1.default)({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(imageRegex)) {
            return cb(new Error('Por favor, envie apenas arquivos de png, jfif ou jpg!'));
        }
        cb(null, true);
    }
});
exports.default = imageUpload;
