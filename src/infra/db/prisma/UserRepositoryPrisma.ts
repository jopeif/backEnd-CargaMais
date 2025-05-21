import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export const prisma = new PrismaClient();

export class UserRepositoryPrisma implements UserRepository {

    async save(user: User): Promise<void> {
        const props = user.getProps();
        await prisma.user.create({
            data: {
                id: props.id,
                email: props.email,
                password: props.password,
                role: props.role,
                createdAt: props.createdAt,
                lastLogin: props.lastLogin,
                isBlocked: props.isBlocked,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { email }
        });

        if (!result) return null;

        return User.assemble({
            id: result.id,
            email: result.email,
            password: result.password,
            role: result.role as 'common' | 'admin',
            createdAt: result.createdAt,
            lastLogin: result.lastLogin,
            isBlocked: result.isBlocked,
        });
    }

    async findById(id: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { id }
        });

        if (!result) return null;

        return User.assemble({
            id: result.id,
            email: result.email,
            password: result.password,
            role: result.role as 'common' | 'admin',
            createdAt: result.createdAt,
            lastLogin: result.lastLogin,
            isBlocked: result.isBlocked,
        });
    }

    async updateLastLogin(id: string, date: Date): Promise<void> {
        try{
            await prisma.user.update({
                where: { id },
                data: { lastLogin: date }
        });
        }catch(error){
            throw error
        }
        
    }

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.user.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}
