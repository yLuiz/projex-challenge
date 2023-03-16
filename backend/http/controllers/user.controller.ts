import { Request, Response } from "express";
import { createJWT, getUserByToken } from "../../utilities/utilities";
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
        const user = await userServices.create({ email, name, password});

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
        const { email } = req.body;

        const user = await userServices.findByEmail(email);

        if (!user) return res.status(404).json({
            message: "User not found!"
        })

        return res.json({ user });
    }

    public async findOneById(req: Request, res: Response) {

        console.log(req.headers.authorization);

        const { id } = req.params;
        const user = await userServices.findById(Number(id));

        if (!user) return res.status(404).json({
            message: "User not found!"
        })

        return res.json({ user });
    }

    public async updateByToken(req: Request, res: Response) {
        const token = req.headers.authorization!.split("Bearer ")[1];
        const user = getUserByToken(token);

        console.log(user)

        return res.json(user)
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