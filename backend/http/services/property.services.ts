import { PrismaClient } from "@prisma/client";
import fs from 'node:fs';
import path from 'node:path';

const prisma = new PrismaClient();

export interface IProperty {
    id?: number;
    title:  string;
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

    public async findByRegister(register: number) {
        const property = await prisma.property.findFirst({
            where: {
                register
            },
            include: {
                PropertyImage: true,
                propertyStatus: true
            }
        });

        return property;
    }

    public async create({title, salePrice, register, purchasePrice,  propertyImages }: IProperty) {

        const property = await prisma.property.create({
            data: {
                title,
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
        

        const propertyImages_ = (await this.findById(property.id))?.PropertyImage;

        let propertyResponse = {
            ...property,
            images: propertyImages_
        }

        return propertyResponse;
    }

    public async update({ id, title, salePrice, register, purchasePrice,  propertyImages }: IProperty) {

        let property = await this.findById(Number(id));

        let updatedProperty = await prisma.property.update({
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

            await prisma.propertyImage.deleteMany({
                where: {
                    propertyId: updatedProperty.id
                }
            });

            property!.PropertyImage.map(propertyImage => {
                const imagePath = path.resolve(__dirname, '..', '..', 'uploads', 'properties', `${propertyImage.name}`);
                fs.unlink(imagePath, () => null);
            });

            propertyImages.forEach(async image => {
                await prisma.propertyImage.create({
                    data: {
                        propertyId: updatedProperty.id,
                        name: image.filename
                    }
                });
            });

            const propertyImagesSaved = await prisma.propertyImage.findMany({
                where: {
                    propertyId: updatedProperty.id
                }
            })

            updatedProperty = {
                ...updatedProperty,
                PropertyImage: [...propertyImagesSaved]
            }
        }        

        return updatedProperty;
    }


    public async deleteById(id: number) {}
}