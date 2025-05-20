import jwt from "jsonwebtoken";
import { RefreshTokenInputDTO } from "../../dto/auth/RefreshTokenInputDTO";
import { RefreshTokenOutputDTO } from "../../dto/auth/RefreshTokenOutputDTO";
import { UseCase } from "../UseCase";

export class RefreshToken implements UseCase<RefreshTokenInputDTO, RefreshTokenOutputDTO>{
    public async execute(input: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO> {
        try {
            const payload = jwt.verify(input.refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
            const newAccessToken = jwt.sign(
                { userId: payload.userId },
                    process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
            );
            return { accessToken: newAccessToken };
        } catch (err) {
            throw new Error("Invalid refresh token");
        }
    }
}
