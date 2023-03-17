import { User } from "@prisma/client";
import { Request, Response } from "express";
import { createJWT } from "../../utilities/createJWT";
import { getUserByToken } from "../../utilities/getUserByToken";
import { ILogin, IUser, UserServices } from "../services/user.services";

const userServices = new UserServices();

export class UserController {

    constructor() {}

    public async login(req: Request, res: Response) {

        const { email, password }: ILogin = req.body;

        const login = await userServices.login({ email, password });

        if (!login.token) {
            return res.status(login.status).json({ message: login.message});
        }

        return res.json({ token: login.token });
    }

    public async create(req: Request, res: Response) {
        const { email, password, name }: IUser = req.body;
        const user = await userServices.create({ email, name, password });

        if (!user) return res.status(422).json({
            message: "Name, email and password is required."
        })

        const token = createJWT({ email, password, sub: user.id });

        return res.json({
            token,
            user
        })

    }

    public async findOneByEmail(req: Request, res: Response) {
        const { email } = req.query;

        const user = await userServices.findByEmail(String(email));

        if (!user) return res.status(404).json({
            message: "User not found!"
        })

        return res.json({ user: {...user, password: undefined } });
    }

    public async findOneById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userServices.findById(Number(id));

        if (!user) return res.status(404).json({
            message: "User not found!"
        })

        return res.json({ user: {...user, password: undefined } });
    }

    public async updateByToken(req: Request, res: Response) {
        const token = req.headers.authorization!.split("Bearer ")[1];
        const user = getUserByToken(token);

        const { name, email, password } = req.body as IUser;

        const updatedUser = await userServices.update({ id: Number(user.sub), name, email, password });

        return res.json(updatedUser);
    }


    public async deleteById(req: Request, res: Response) {

        const { id } = req.params;
        const user = await userServices.deleteById(Number(id));

        if (!user) return res.status(404).json({
            message: "User not found!"
        })

        return res.status(200).json();
    }

}