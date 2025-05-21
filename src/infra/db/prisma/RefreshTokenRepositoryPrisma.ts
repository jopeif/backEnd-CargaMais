import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export class RefreshTokenRepositoryPrisma {
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
