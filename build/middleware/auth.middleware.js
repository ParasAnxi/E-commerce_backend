"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const authenticate = async (req, res, next) => {
    try {
        let token;
        // Check for token in cookies first, then Authorization header
        if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User belonging to this token no longer exists' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
exports.authenticate = authenticate;
