import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET!);
        req.user = payload as any;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authenticated" });
    }
};