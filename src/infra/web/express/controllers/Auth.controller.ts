import { Request, Response } from "express";
import { Login } from "../../../../application/usecase/auth/Login";
import { RefreshToken } from "../../../../application/usecase/auth/RefreshToken";
import { RegisterUser } from "../../../../application/usecase/auth/RegisterUser";

export class AuthController {
    constructor(
    private loginUseCase: Login,
    private refreshAccessToken: RefreshToken,
    private registerUser: RegisterUser
) {}


    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.loginUseCase.execute({ email, password });
            res.status(200).json(result);
            } catch (err) {
                res.status(401).json({ error: err });
            }
    }

    public async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;
            const result = await this.refreshAccessToken.execute({ refreshToken });
            res.status(200).json(result);
        } catch (err) {
            console.error(err)
            res.status(401).json({ error: err });
        }
    }

    async registrarUsuario(req: Request, res: Response) {
    try {
        const { email, password, role } = req.body;
        const result = await this.registerUser.execute({ email, password, role });
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: `Unable to create user: ${err}` });
    }
}

}
