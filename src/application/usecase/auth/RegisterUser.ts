import { RegisterUserInputDTO } from "../../dto/auth/RegisterUserInputDTO";
import { RegisterUserOutputDTO } from "../../dto/auth/RegisterUserOutputDTO";
import { UseCase } from "../UseCase";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { hash } from "bcrypt";

export class RegisterUser implements UseCase<RegisterUserInputDTO, RegisterUserOutputDTO> {
    constructor(private userRepo: UserRepository) {}

    async execute(input: RegisterUserInputDTO): Promise<RegisterUserOutputDTO> {
        const senhaCriptografada = await hash(input.password, 10);

        const user = User.build(input.email, senhaCriptografada, input.role);
        await this.userRepo.save(user);

        return {
            id: user.id,
            message: "User created successfully"
        };
    }
}
