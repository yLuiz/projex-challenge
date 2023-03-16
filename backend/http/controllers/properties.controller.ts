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
        const { salePrice, register, purchasePrice }: IProperty = req.body;
        const files = req.files as Express.Multer.File[];


        if (!files) {
            return res.status(422).json({
                message: "Images is required."
            })
        }

        const property = await propertyServices.create({
            salePrice: Number(salePrice),
            register: Number(register),
            purchasePrice: Number(purchasePrice),
            propertyImages: files
        });

        return res.json({ property });
    }

    public async update(req: Request, res: Response) {}


    public async deleteById(req: Request, res: Response) {}

}