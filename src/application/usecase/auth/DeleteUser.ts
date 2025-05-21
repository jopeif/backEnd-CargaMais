import { UserRepository } from "../../../domain/repositories/UserRepository";
import { RefreshTokenRepositoryPrisma } from "../../../infra/db/prisma/RefreshTokenRepositoryPrisma";
import { UserDeleteInputDTO } from "../../dto/auth/delete/UserDeleteInputDTO";
import { UserDeleteOutputDTO } from "../../dto/auth/delete/UserDeleteOutputDTO";
import { UseCase } from "../UseCase";

export class DeleteUser implements UseCase<UserDeleteInputDTO, UserDeleteOutputDTO> {
    constructor(private readonly userRepo: UserRepository, private readonly refreshTokenRepo: RefreshTokenRepositoryPrisma){}

    async execute(input: UserDeleteInputDTO): Promise<UserDeleteOutputDTO> {
        const id = input.id
        const idExists = await this.userRepo.findById(id)

        if(!idExists){
            throw new Error("User doesn't exist.")
        }

        const refreshToken = await this.refreshTokenRepo.findByUserId(id)

        if(refreshToken){
            this.refreshTokenRepo.deleteAllFromUser(id)
        }

        this.userRepo.delete(id)

        return {message:"User deleted successfully"}

    }
}