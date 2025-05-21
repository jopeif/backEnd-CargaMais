import { Request, Response, NextFunction } from "express";

/**
 * Verifica se o usuário autenticado tem permissão para alterar/deletar
 * o recurso baseado em um `req.params[paramName]`.
 * Permitido se:
 * - O usuário for o dono do recurso (id igual)
 * - Ou se for um admin
 *
 * @param paramName Nome do parâmetro na rota que contém o ID do alvo (ex: "id")
 */
export function ownershipOrAdminMiddleware(paramName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const user = req.user;
        const targetId = req.params[paramName];

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (user.userId === targetId || user.role === "admin") {
            return next();
        }

        return res.status(403).json({ error: "Access denied: insufficient permissions" });
    };
}
