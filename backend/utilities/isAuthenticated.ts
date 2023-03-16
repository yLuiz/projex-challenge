import { NextFunction, Request, Response } from "express";
import { environments } from "../environment/enviroments";
import jwt from 'jsonwebtoken';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    
    if (!authorization) return res.status(401).json({
        message: "Token is missing!"
    });

    const token = authorization.split("Bearer ")[1];

    try {
        const isValidToken = jwt.verify(token, environments.JWT_SECRET);

        if (isValidToken)
            next();

    } catch(err) {
        return res.status(401).json({
            message: "Token is invalid!"
        });
    }
}