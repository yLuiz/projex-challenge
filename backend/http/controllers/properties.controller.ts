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
        const { salePrice, register, purchasePrice, title }: IProperty = req.body;
        
        const propertyAlreadyExists = await propertyServices.findByRegister(Number(register));

        if (propertyAlreadyExists) {
            return res.status(400).json({ 
                message: "Property already exists."
            })
        }
        
        const files = req.files as Express.Multer.File[];

        if (!files) {
            return res.status(422).json({
                message: "Images is required."
            })
        }

        const property = await propertyServices.create({
            title,
            salePrice: Number(salePrice),
            register: Number(register),
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
        
        const propertyAlreadyExists = await propertyServices.findByRegister(Number(register));

        if (propertyAlreadyExists && Number(register) !== property.register) {
            return res.status(400).json({
                message: "One property with this register already exists."
            });
        }
        
        const files = req.files as Express.Multer.File[];

        const updatedProperty = await propertyServices.update({
            id: Number(id),
            title,
            salePrice: Number(salePrice),
            register: Number(register),
            purchasePrice: Number(purchasePrice),
            propertyImages: files
        });

        return res.json({
            property: updatedProperty
        });
    }


    public async deleteById(req: Request, res: Response) {}

}