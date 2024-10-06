import { Router } from "express";
import { CategoryMarkerController } from "../controllers/CategoryMarkerController";

const router = Router();

router.get("/", CategoryMarkerController.getAll);
router.get("/:name", CategoryMarkerController.getById);
router.post("/", CategoryMarkerController.create);
router.put("/:name", CategoryMarkerController.update);
router.delete("/:name", CategoryMarkerController.delete);

export default router;