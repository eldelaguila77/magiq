import { Router } from "express";
import { PhotoController } from "../controllers/PhotoController";

const router = Router();

router.get("/", PhotoController.getAll);
router.get("/:id", PhotoController.getById);
router.post("/", PhotoController.create);
router.put("/:id", PhotoController.update);
router.delete("/:id", PhotoController.delete);

export default router;