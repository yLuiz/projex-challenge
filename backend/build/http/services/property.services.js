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
exports.PropertyServices = void 0;
const client_1 = require("@prisma/client");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const prisma = new client_1.PrismaClient();
class PropertyServices {
    constructor() { }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = yield prisma.property.findMany({
                include: {
                    PropertyImage: true,
                    propertyStatus: true
                }
            });
            return properties;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield prisma.property.findFirst({
                where: {
                    id
                },
                include: {
                    PropertyImage: true,
                    propertyStatus: true
                }
            });
            return property;
        });
    }
    findByRegister(register) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield prisma.property.findFirst({
                where: {
                    register
                },
                include: {
                    PropertyImage: true,
                    propertyStatus: true
                }
            });
            return property;
        });
    }
    create({ title, salePrice, register, purchasePrice, propertyImages, propertyStatusId }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const profit = (Number(salePrice) - Number(purchasePrice)).toFixed(2);
            const profitPercent = (Number(profit) * 100 / salePrice).toFixed(2);
            // console.log(`
            //     salePrice: ${salePrice}
            //     purchasePrice: ${purchasePrice}
            //     diference: ${salePrice - purchasePrice}
            //     profit: ${profit}
            // `)
            const property = yield prisma.property.create({
                data: {
                    title,
                    salePrice,
                    register,
                    purchasePrice,
                    propertyProfit: profit,
                    propertyProfitPercent: profitPercent,
                    propertyStatusId
                }
            });
            const images = propertyImages.map(image => image.filename);
            for (let image of images) {
                yield prisma.propertyImage.create({
                    data: {
                        name: image,
                        propertyId: property.id
                    }
                });
            }
            ;
            const propertyImages_ = (_a = (yield this.findById(property.id))) === null || _a === void 0 ? void 0 : _a.PropertyImage;
            let propertyResponse = Object.assign(Object.assign({}, property), { images: propertyImages_ });
            return propertyResponse;
        });
    }
    update({ id, title, salePrice, register, purchasePrice, propertyImages }) {
        return __awaiter(this, void 0, void 0, function* () {
            let property = yield this.findById(Number(id));
            let updatedProperty = yield prisma.property.update({
                where: {
                    id
                },
                data: {
                    title,
                    salePrice,
                    register,
                    purchasePrice
                },
                include: {
                    PropertyImage: true
                }
            });
            if (propertyImages.length) {
                yield prisma.propertyImage.deleteMany({
                    where: {
                        propertyId: updatedProperty.id
                    }
                });
                property.PropertyImage.map(propertyImage => {
                    const imagePath = node_path_1.default.resolve(__dirname, '..', '..', 'uploads', 'properties', `${propertyImage.name}`);
                    node_fs_1.default.unlink(imagePath, () => null);
                });
                propertyImages.forEach((image) => __awaiter(this, void 0, void 0, function* () {
                    yield prisma.propertyImage.create({
                        data: {
                            propertyId: updatedProperty.id,
                            name: image.filename
                        }
                    });
                }));
                const propertyImagesSaved = yield prisma.propertyImage.findMany({
                    where: {
                        propertyId: updatedProperty.id
                    }
                });
                updatedProperty = Object.assign(Object.assign({}, updatedProperty), { PropertyImage: [...propertyImagesSaved] });
            }
            return updatedProperty;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield this.findById(id);
            if (!property)
                return null;
            yield prisma.propertyImage.deleteMany({
                where: {
                    propertyId: id
                }
            });
            yield prisma.property.delete({
                where: {
                    id
                }
            });
            return true;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.propertyImage.deleteMany();
            yield prisma.property.deleteMany();
            return;
        });
    }
}
exports.PropertyServices = PropertyServices;
