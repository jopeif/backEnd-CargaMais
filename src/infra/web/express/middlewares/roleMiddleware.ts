import { Request, Response, NextFunction } from "express";

// roles esperados: ex. ["admin"], ["common"], ["admin", "common"]
export function roleMiddleware(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        // @ts-ignore
        const user = req.user;

        if (!user || !allowedRoles.includes(user.role)) {
            res.status(403).json({ error: "Access denied: insufficient permissions" });
            return;
        }

        next();
    };
}

