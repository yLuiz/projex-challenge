
import jwt, { JwtPayload } from 'jsonwebtoken';

export function getUserByToken(token: string) {
    const payload = jwt.decode(token) as JwtPayload;
    return payload;
}