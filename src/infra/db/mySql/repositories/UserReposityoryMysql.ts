import { connection } from "../Mysqlconnection";
import { User } from "../../../../domain/entities/User";
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { RowDataPacket } from "mysql2";

//implements UserRepository
export class UserRepositoryMysql  {

    async save(user: User): Promise<void> {
        const props = user.getProps();
        await connection.query(
            `INSERT INTO users 
            (id, email, password, role, created_at, last_login, is_blocked)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                props.id,
                props.email,
                props.password,
                props.role,
                props.createdAt,
                props.lastLogin,
                props.isBlocked
            ]
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        try{
            const [[result]] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM users WHERE email = ?",
                [email]
            );

            if (!result) return null;

            return User.assemble({
                id: result.id,
                email: result.email,
                password: result.password,
                role: result.role,
                createdAt: result.created_at,
                lastLogin: result.last_login,
                isBlocked: result.is_blocked
            });
        }catch(err){
            throw err
        }
    }

    async findById(id: string): Promise<User | null> {
        const [[result]] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        if (!result) return null;

        return User.assemble({
            id: result.id,
            email: result.email,
            password: result.password,
            role: result.role,
            createdAt: result.created_at,
            lastLogin: result.last_login,
            isBlocked: result.is_blocked
        });
    }

    async updateLastLogin(id: string, date: Date): Promise<void> {
        await connection.query("UPDATE users SET last_login = ? WHERE id = ?", [
            date,
            id
        ]);
    }
}
