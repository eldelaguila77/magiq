import { Router } from "express";
import { UserPointsController } from "../controllers/UserPointsController";

const router = Router();

router.get("/", UserPointsController.getAll);
router.get("/:id", UserPointsController.getById);
router.post("/", UserPointsController.create);
router.put("/:id", UserPointsController.update);
router.delete("/:id", UserPointsController.delete);

export default router;