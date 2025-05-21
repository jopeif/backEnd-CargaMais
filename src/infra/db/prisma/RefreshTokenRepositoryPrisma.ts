import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { RefreshTokenRepository } from "../../../domain/repositories/RefreshTokenRepository";

export const prisma = new PrismaClient();

export class RefreshTokenRepositoryPrisma implements RefreshTokenRepository{
    async save(userId: string, token: string, expiresAt: Date): Promise<void> {
        const id = uuidv4();
        await prisma.refreshToken.create({
            data: {
                id,
                userId,
                token,
                expiresAt,
            },
        });
    }

    async findByToken(token: string): Promise<any | null> {
        return await prisma.refreshToken.findUnique({
            where: { token }
        });
    }

    async findByUserId(userId: string): Promise<any[] | null> {
        return await prisma.refreshToken.findMany({
            where: { userId }
        })
    }

    async deleteByToken(token: string): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: { token }
        });
    }

    async deleteAllFromUser(userId: string): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: { userId }
        });
    }
}
