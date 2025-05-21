import { Login } from "../application/usecase/auth/Login";
import { RefreshToken } from "../application/usecase/auth/RefreshToken";
import { RegisterUser } from "../application/usecase/auth/RegisterUser";
import { RefreshTokenRepositoryMysql } from "../infra/db/mySql/repositories/RefreshTokenRepository";
import { RefreshTokenRepositoryPrisma } from "../infra/db/prisma/RefreshTokenRepositoryPrisma";
import { UserRepositoryPrisma } from "../infra/db/prisma/UserRepositoryPrisma";
import { AuthController } from "../infra/web/express/controllers/Auth.controller";


export class Container{
    public get authController(): AuthController {
        const userRepo = new UserRepositoryPrisma()
        const refreshTokenRepo = new RefreshTokenRepositoryPrisma
        const refresh = new RefreshToken(refreshTokenRepo);
        const login = new Login(userRepo, refreshTokenRepo);
        const register = new RegisterUser(userRepo);
        return new AuthController(login, refresh, register);
    }
}
