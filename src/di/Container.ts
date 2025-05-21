import { Login } from "../application/usecase/auth/Login";
import { RefreshToken } from "../application/usecase/auth/RefreshToken";
import { RegisterAdmin } from "../application/usecase/auth/register/RegisterAdmin";
import { RegisterUser } from "../application/usecase/auth/register/RegisterUser";
import { RefreshTokenRepositoryPrisma } from "../infra/db/prisma/RefreshTokenRepositoryPrisma";
import { UserRepositoryPrisma } from "../infra/db/prisma/UserRepositoryPrisma";
import { AuthController } from "../infra/web/express/controllers/Auth.controller";

import { PersonController } from "../infra/web/express/controllers/Person.controller";
import { CreatePerson } from "../application/usecase/person/CreatePerson";
import { DeletePerson } from "../application/usecase/person/DeletePerson";
import { UpdatePerson } from "../application/usecase/person/UpdatePerson";
import { PersonRepositoryPrisma } from "../infra/db/prisma/PersonRepositoryPrisma";
import { DeleteUser } from "../application/usecase/auth/DeleteUser";

export class Container{
    
    public get authController(): AuthController {
        const userRepo = new UserRepositoryPrisma()
        const refreshTokenRepo = new RefreshTokenRepositoryPrisma
        const refresh = new RefreshToken(refreshTokenRepo);
        const login = new Login(userRepo, refreshTokenRepo);
        const register = new RegisterUser(userRepo);
        const registerAdmin = new RegisterAdmin(userRepo);
        return new AuthController(login, refresh, register, registerAdmin);
    }

    public get personController(): PersonController {
        const personRepo = new PersonRepositoryPrisma();
        const deleteUser = new DeleteUser(new UserRepositoryPrisma(), new RefreshTokenRepositoryPrisma())
        const createPerson = new CreatePerson(personRepo);
        const deletePerson = new DeletePerson(personRepo, deleteUser);
        const updatePerson = new UpdatePerson(personRepo);
        return new PersonController(createPerson, deletePerson, updatePerson);
    }
}
