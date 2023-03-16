import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IProperty {
    id?: number;
    register: number;         
    salePrice: number;        
    purchasePrice: number;       
    propertyStatusId?: number; 
    propertyImages: Express.Multer.File[]
}

export class PropertyServices {

    constructor() {}

    public async findMany() {
        const properties = await prisma.property.findMany({
            include: {
                PropertyImage: true,
                propertyStatus: true
            }
        });

        return properties;
    }

    public async findById(id: number) {
        const property = await prisma.property.findFirst({
            where: {
                id
            },
            include: {
                PropertyImage: true,
                propertyStatus: true
            }
        });

        return property;
    }

    public async create({salePrice, register, purchasePrice,  propertyImages }: IProperty) {
        const property = await prisma.property.create({
            data: {
                salePrice, 
                register, 
                purchasePrice
            }
        })

        const images = propertyImages.map(image => image.filename);

        for(let image of images) {
            await prisma.propertyImage.create({
                data: {
                    name: image,
                    propertyId: property.id
                }
            })
        };
        

        const image = await this.findById(property.id);
        return image?.PropertyImage;
    }

    public async update(id: number) {}


    public async deleteById(id: number) {}
}