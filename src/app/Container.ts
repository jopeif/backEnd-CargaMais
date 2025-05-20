import { Login } from "../application/usecase/auth/Login";
import { RefreshToken } from "../application/usecase/auth/RefreshToken";
import { RegisterUser } from "../application/usecase/auth/RegisterUser";
import { UserRepositoryMysql } from "../infra/db/mySql/UserReposityoryMysql";
import { AuthController } from "../infra/web/express/controllers/Auth.controller";


export class Container{
    public get authController(): AuthController {
        const userRepo = new UserRepositoryMysql
        const login = new Login(userRepo);
        const refresh = new RefreshToken()
        const register = new RegisterUser(userRepo);
        return new AuthController(login, refresh, register);
    }
}
