import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const router = Router();

router.get("/", CategoryController.getAll);
router.get("/:name", CategoryController.getById);
router.post("/", CategoryController.create);
router.put("/:name", CategoryController.update);
router.delete("/:name", CategoryController.delete);

export default router;