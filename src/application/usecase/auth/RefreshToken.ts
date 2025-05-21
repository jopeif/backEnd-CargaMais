import jwt from "jsonwebtoken";
import { RefreshTokenInputDTO } from "../../dto/auth/refreshToken/RefreshTokenInputDTO";
import { RefreshTokenOutputDTO } from "../../dto/auth/refreshToken/RefreshTokenOutputDTO";
import { UseCase } from "../UseCase";
import { config } from "../../../infra/config/config";
import { RefreshTokenRepositoryPrisma } from "../../../infra/db/prisma/RefreshTokenRepositoryPrisma";

export class RefreshToken implements UseCase<RefreshTokenInputDTO, RefreshTokenOutputDTO> {
    constructor(private refreshTokenRepo: RefreshTokenRepositoryPrisma) {}

    public async execute(input: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO> {
        const oldToken = input.refreshToken;

        let payload: any;
        try {
            payload = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET!);
        } catch {
            throw new Error("Invalid refresh token");
        }

        const existingToken = await this.refreshTokenRepo.findByToken(oldToken);
        if (!existingToken) {
            throw new Error("Refresh token not found");
        }

        // Remove o token antigo
        await this.refreshTokenRepo.deleteByToken(oldToken);

        // Cria novo refresh e access token
        const newAccessToken = jwt.sign(
            { userId: payload.userId },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { userId: payload.userId },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: `${config.refreshTokenDurationInDays}d` }
        );

        const expiresAt = new Date(Date.now() + config.refreshTokenDurationInDays * 24 * 60 * 60 * 1000); // 7 dias

        await this.refreshTokenRepo.save(payload.userId, newRefreshToken, expiresAt);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}
