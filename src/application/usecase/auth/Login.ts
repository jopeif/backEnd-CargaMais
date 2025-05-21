import { UserRepository } from "../../../domain/repositories/UserRepository";
import { LoginInputDTO } from "../../dto/auth/login/LoginInputDTO";
import { LoginOutputDTO } from "../../dto/auth/login/LoginOutputDTO";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UseCase } from "../UseCase";
import { RefreshTokenRepositoryMysql } from "../../../infra/db/mySql/repositories/RefreshTokenRepository";
import { config } from "../../../infra/config/config";

export class Login implements UseCase<LoginInputDTO, LoginOutputDTO> {
    constructor(private readonly userRepo: UserRepository, private readonly refreshToken: RefreshTokenRepositoryMysql) {}

    public async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {

        try {
            const user = await this.userRepo.findByEmail(input.email);

            if (!user || user.isBlocked || !(await bcrypt.compare(input.password, user.password))) {
                throw new Error("Invalid credentials");
            }

            const accessToken = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
            );

            const refreshToken = jwt.sign(
                { userId: user.id },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: `${config.refreshTokenDurationInDays}d` }
            );

            const expiresAt = new Date(Date.now() + config.refreshTokenDurationInDays * 24 * 60 * 60 * 1000);

            await this.refreshToken.save(user.id, refreshToken, expiresAt);
            await this.userRepo.updateLastLogin(user.id, new Date());

            return { accessToken, refreshToken };
        } catch (err) {
            console.log("Login error:", err);
            throw err;
        }
    }
}
