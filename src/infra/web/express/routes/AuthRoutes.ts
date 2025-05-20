import { Router } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";

const router = Router();
const container = ContainerFactory.getContainer();

router.post("/login", (req, res) => container.authController.login(req, res));
router.post("/refresh-token", (req, res) => container.authController.refreshToken(req, res));
router.post("/register", (req, res) => container.authController.registrarUsuario(req, res));


export default router;
