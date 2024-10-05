import { Router } from "express";
import { PointController } from "../controllers/PointController";

const router = Router();

router.get("/", PointController.getAll);
router.get("/:id", PointController.getById);
router.post("/", PointController.create);
router.put("/:id", PointController.update);
router.delete("/:id", PointController.delete);

export default router;