import express from "express"
import {
	listarLivros,
	criarLivro,
	atualizarLivro,
	deletarLivro
} from "../controllers/livros.controller.js"

const router = express.Router()

router.get("/livros", listarLivros)
router.post("/livros", criarLivro)
router.put("/livros/:id", atualizarLivro)
router.delete("/livros/:id", deletarLivro)

export default router