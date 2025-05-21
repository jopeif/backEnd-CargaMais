import { Router } from "express";
import { ContainerFactory } from "../../../../di/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();
const container = ContainerFactory.getContainer();

router.post("", (req, res)=>{container.personController.createPerson(req, res)})
router.delete("/:id", (req, res)=>{container.personController.deletePerson(req, res)})
router.put("/:id", (req, res)=>{container.personController.updatePerson(req, res)})

export default router;
