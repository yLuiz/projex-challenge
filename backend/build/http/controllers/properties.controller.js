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
exports.PropertiesController = void 0;
const property_services_1 = require("../services/property.services");
const propertyServices = new property_services_1.PropertyServices();
class PropertiesController {
    constructor() { }
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = yield propertyServices.findMany();
            return res.json({ properties });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { salePrice, register, purchasePrice, title, propertyStatusId } = req.body;
            const propertyAlreadyExists = yield propertyServices.findByRegister(register);
            if (propertyAlreadyExists) {
                return res.status(400).json({
                    message: "Property already exists."
                });
            }
            const files = req.files;
            if (!files.length) {
                return res.status(422).json({
                    message: "Images is required."
                });
            }
            if (!salePrice || !register || !purchasePrice || !title) {
                return res.status(422).json({
                    message: "salePrice, register, purchasePrice and title are required."
                });
            }
            if (Number(salePrice) < Number(purchasePrice)) {
                return res.status(422).json({
                    message: "salePrice can not be less then purchasePrice."
                });
            }
            const property = yield propertyServices.create({
                title,
                salePrice: Number(salePrice),
                register,
                propertyStatusId: propertyStatusId ? Number(propertyStatusId) : undefined,
                purchasePrice: Number(purchasePrice),
                propertyImages: files
            });
            return res.json({ property });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const property = yield propertyServices.findById(Number(id));
            if (!property) {
                return res.status(404).json({ message: "Property not found." });
            }
            const { title, salePrice, register, purchasePrice } = req.body;
            const propertyAlreadyExists = yield propertyServices.findByRegister(register);
            if (propertyAlreadyExists && register !== property.register) {
                return res.status(400).json({
                    message: "One property with this register already exists."
                });
            }
            const files = req.files;
            const updatedProperty = yield propertyServices.update({
                id: Number(id),
                title,
                salePrice: Number(salePrice),
                register,
                purchasePrice: Number(purchasePrice),
                propertyImages: files
            });
            return res.json({
                property: updatedProperty
            });
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const querySuccess = yield propertyServices.deleteById(+id);
            if (!querySuccess)
                return res.status(404).json({ message: "Deleted with success." });
            return res.json({ message: "Deleted with success." });
        });
    }
    deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield propertyServices.deleteAll();
            return res.json({ message: "All properties deleted." });
        });
    }
}
exports.PropertiesController = PropertiesController;
