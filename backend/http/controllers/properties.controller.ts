import { Request, Response } from "express";
import { PropertiesServices } from "../services/properties.services";

const propertiesServices = new PropertiesServices();

export class PropertiesController {
    constructor() {}

    public async findMany(req: Request, res: Response) {
        const properties = propertiesServices.findMany();

        return res.json({ properties });
    }

    public async findById(id: number) {}

    public async create() {}

    public async update(id: number) {}


    public async deleteById(id: number) {}

}