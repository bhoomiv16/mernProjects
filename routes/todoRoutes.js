import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateStatus,
  updateTodo,
} from "../controllers/TodoControllers.js";
import { auth } from "../middleware/auth.js";

let router = Router();
router.post("/", auth, createTodo);

router.get("/", auth, getTodos);

router.get("/:id",  auth,getTodo);

router.delete("/:id", auth, deleteTodo);

router.patch("/:id", auth, updateTodo);

router.patch("/status/:id", auth, updateStatus);

export default router;
