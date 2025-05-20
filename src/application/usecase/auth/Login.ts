import { UserRepository } from "../../../domain/repositories/UserRepository";
import { LoginInputDTO } from "../../dto/auth/LoginInputDTO";
import { LoginOutputDTO } from "../../dto/auth/LoginOutputDTO";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UseCase } from "../UseCase";

export class Login implements UseCase<LoginInputDTO, LoginOutputDTO>{
    constructor(private readonly userRepo: UserRepository) {}

    public async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {
        const user = await this.userRepo.findByEmail(input.email);
        if (!user || user.isBlocked || !await bcrypt.compare(input.password, user.password)) {
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
            { expiresIn: "7d" }
        );

        return { accessToken, refreshToken };
    }
}
