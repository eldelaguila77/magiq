import { Router } from "express";
import { MarkerController } from "../controllers/MarkerController";

const router = Router();

router.get("/", MarkerController.getAll);
router.get("/:id", MarkerController.getById);
router.post("/", MarkerController.create);
router.put("/:id", MarkerController.update);
router.delete("/:id", MarkerController.delete);

export default router;