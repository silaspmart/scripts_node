import express from "express"
import { listarUsuarios, criarUsuario, buscarUsuarioPorId, deletarUsuario } from "../controllers/usuarios.controller.js"
import { atualizarUsuario } from "../controllers/usuarios.controller.js"

const router = express.Router()

router.get("/usuarios", listarUsuarios)
router.get("/usuarios/:id", buscarUsuarioPorId)
router.post("/usuarios", criarUsuario)
router.put("/usuarios/:id", atualizarUsuario)
router.delete("/usuarios/:id", deletarUsuario)

export default router