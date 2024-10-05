import { Router } from "express";
import { MedalController } from "../controllers/MedalController";

const router = Router();

router.get("/", MedalController.getAll);
router.get("/:name", MedalController.getById);
router.post("/", MedalController.create);
router.put("/:name", MedalController.update);
router.delete("/:name", MedalController.delete);

export default router;