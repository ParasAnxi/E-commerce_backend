import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';

export interface AuthRequest extends Request {
    user?: IUser;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token;

        if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User belonging to this token no longer exists' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
