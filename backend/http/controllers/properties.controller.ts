import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PropertiesController {
    constructor() {}

    public async findMany() {
        const properties = await prisma
    }

    public async findById(id: number) {}

    public async create() {}

    public async update(id: number) {}


    public async deleteById(id: number) {}

}