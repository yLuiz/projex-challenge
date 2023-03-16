import { ILogin } from '../http/services/user.services';

import jwt, { JsonWebTokenError, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { environments } from '../environment/enviroments';

export function createJWT({ email, password, sub }: ILogin) {
    const token = jwt.sign({ email, password, sub }, environments.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
};

export function getUserByToken(token: string) {
    const payload = jwt.decode(token);
    return payload;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization!.split("Bearer ")[1];

    if (!token) return res.status(401).json({
        message: "Token is missing!"
    });

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