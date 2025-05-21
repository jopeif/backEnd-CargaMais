import { Router } from "express";
import { ContainerFactory } from "../../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();

router.post("/login", (req, res) => container.authController.login(req, res));
router.post("/refresh-token", (req, res) => container.authController.refreshToken(req, res));
router.post("/register", (req, res) => container.authController.registrarUsuario(req, res));
router.post("/admin/register", authMiddleware, roleMiddleware(["admin"]), (req, res)=> container.authController.registrarAdmin(req, res))

router.get("/me", authMiddleware, (req, res) => container.authController.getProfile(req, res));
router.get("/admin/me", authMiddleware, roleMiddleware(["admin"]), (req, res)=> container.authController.getProfile(req, res))



export default router;
