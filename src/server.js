import express from "express"
import rotasUsuario from "./routes/usuarios.routes.js"

const porta = 3000
const api = express()

api.use( express.json() )
api.use( rotasUsuario )

api.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
})

//-------------------------------------------------------------------------------------------------

import rotasLivros from "./routes/livros.routes.js"

api.use(rotasLivros)