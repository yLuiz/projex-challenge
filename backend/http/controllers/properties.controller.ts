import { Request, Response } from "express";
import { IProperty, PropertyServices } from "../services/property.services";

const propertyServices = new PropertyServices();

export class PropertiesController {
    constructor() {}

    public async findMany(req: Request, res: Response) {
        const properties = await propertyServices.findMany();

        return res.json({ properties });
    }

    public async findById(req: Request, res: Response) {}

    public async create(req: Request, res: Response) {
        const { salePrice, register, purchasePrice, title, propertyStatusId }: IProperty = req.body;
        
        const propertyAlreadyExists = await propertyServices.findByRegister(register);

        if (propertyAlreadyExists) {
            return res.status(400).json({ 
                message: "Property already exists."
            })
        }
        
        const files = req.files as Express.Multer.File[];

        if (!files.length) {
            return res.status(422).json({
                message: "Images is required."
            })
        }

        if (!salePrice || !register || !purchasePrice || !title) {
            return res.status(422).json({
                message: "salePrice, register, purchasePrice and title are required."
            })
        }

        if (Number(salePrice) < Number(purchasePrice)) {
            return res.status(422).json({
                message: "salePrice can not be less then purchasePrice."
            });
        }

        const property = await propertyServices.create({
            title,
            salePrice: Number(salePrice),
            register,
            propertyStatusId: propertyStatusId ? Number(propertyStatusId) : undefined,
            purchasePrice: Number(purchasePrice),
            propertyImages: files
        });

        return res.json({ property });
    }

    public async update(req: Request, res: Response) {

        const { id } = req.params;
        const property = await propertyServices.findById(Number(id));

        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        const { title, salePrice, register, purchasePrice }: IProperty = req.body;
        
        const propertyAlreadyExists = await propertyServices.findByRegister(register);

        if (propertyAlreadyExists && register !== property.register) {
            return res.status(400).json({
                message: "One property with this register already exists."
            });
        }
        
        const files = req.files as Express.Multer.File[];

        const updatedProperty = await propertyServices.update({
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
    }


    public async deleteById(req: Request, res: Response) {

        const { id } = req.params;

        const querySuccess = await propertyServices.deleteById(+id);

        if (!querySuccess) return res.status(404).json({ message: "Deleted with success." });

        return res.json({ message: "Deleted with success." });
    }

    public async deleteAll(req: Request, res: Response) {
        await propertyServices.deleteAll();

        return res.json({ message: "All properties deleted." });
    }

}