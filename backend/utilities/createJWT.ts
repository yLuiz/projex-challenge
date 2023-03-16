import { ILogin } from '../http/services/user.services';

import jwt from 'jsonwebtoken';
import { environments } from '../environment/enviroments';

export function createJWT({ email, password, sub }: ILogin) {
    const token = jwt.sign({ email, password, sub }, environments.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
};
