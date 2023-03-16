import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createJWT } from "../../utilities/utilities";

export interface ILogin {
    email: string,
    password: string,
    sub?: number
}

export interface IUser {
    email: string,
    password: string,
    name: string,    
}

const prisma = new PrismaClient();

export class UserServices {

    public async login({ email, password }: ILogin) {

        if (!email || !password) return { 
            status: 422,
            message: "Email and password is required",
            token: null
        };

        const user = await this.findByEmail(email);

        if (!user) {
            return {
                status: 401,
                message: "Invalid credentials.",
                token: null
            };
        }

        const validPassoword = await bcrypt.compare(password, user.password);
        if (!validPassoword)  {
            return {
                status: 401,
                message: "Invalid credentials.",
                token: null
            }
        }

        const token = createJWT({ email, password, sub: user.id });

        return { 
            status: 200,
            message: "Authenticated",
            token
        };
    }

    public async create({ email, password, name }: IUser) {

        if (!name || !email || !password) return null;

        const salt = await bcrypt.genSalt(8)
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });

        return user;
    }

    public async findById(id: number) {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!user) return null;

        return user;
    }


    public async findByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) return null;

        return user;
    }

    public async deleteById(id: number) {
        const user = await this.findById(id);

        if (!user) return null;

        await prisma.user.delete({
            where: {
                id
            }
        })

        return true;
    }
}