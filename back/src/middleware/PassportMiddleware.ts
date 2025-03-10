import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { prismaClient } from '../Databases/PrismaClient';
import { UnauthorazedError } from '../helpers/apiErrors';
import type { UserTypes } from '../helpers/types/User';

dotenv.config();

const expireTime = "12h"

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await prismaClient.user.findUnique({where: {id: payload.user.id}})
    return user ? done(null, user) : done(new UnauthorazedError("Unauthorazed user"), false);
}))

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    passport.authenticate("jwt", (_err: Error, user: any) => {
        const { password: _, ...dataUser } = user
        req.user = dataUser;
        return user ? next() : next(new UnauthorazedError("Unauthorazed user"));
    })(req, res, next);
};

export const generateToken = (data: UserTypes) => {
    return jwt.sign({user: data}, process.env.JWT_SECRET as string, { expiresIn: expireTime })
}

export const verifyToken = (token: string) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string) as {user: UserTypes, "iat": number, exp: number}
        return user.user;
    } catch (error) {
        throw new UnauthorazedError("Invalid token!");    
    }
}


export default passport;