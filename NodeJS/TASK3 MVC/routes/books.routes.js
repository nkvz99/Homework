import { Router } from "express";
import BookController from "../controllers/books.controller.js";

const router = Router()

router.post("/", BookController.createBook);
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBookById);
router.delete("/:id", BookController.deleteBook);
router.get("/stats", BookController.getStats);

export default router