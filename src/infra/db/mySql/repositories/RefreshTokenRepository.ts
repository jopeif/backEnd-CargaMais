import { connection } from "../Mysqlconnection";
import { v4 as uuidv4 } from "uuid";

export class RefreshTokenRepositoryMysql {
    async save(userId: string, token: string, expiresAt: Date): Promise<void> {
        const id = uuidv4();
        await connection.query(
        `INSERT INTO refresh_tokens (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)`,
        [id, userId, token, expiresAt]
        );
    }

    async findByToken(token: string): Promise<any | null> {
        const [rows] = await connection.query(
        `SELECT * FROM refresh_tokens WHERE token = ?`,
        [token]
        );
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }

    async deleteByToken(token: string): Promise<void> {
        await connection.query(`DELETE FROM refresh_tokens WHERE token = ?`, [token]);
    }

    async deleteAllFromUser(userId: string): Promise<void> {
        await connection.query(`DELETE FROM refresh_tokens WHERE user_id = ?`, [userId]);
    }
}
