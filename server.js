import express from "express"

const porta = 3000  // variavel "porta"
const api = express()
const pessoas = [
    {
        id: 1,
        nome: "Carlos",
        idade: 29,
        area: "ti - software"
    },
    {
        id: 2,
        nome: "Fred",
        idade: 25,
        area: "mecanica"
    }
]

api.use(express.json())

api.get("/pessoas", (req, res)=>{
    const filtros = req.query
    let resposta = pessoas

    if (filtros.nome) {
            resposta = resposta.filter((pessoa) => {
                return pessoa.nome.toLowerCase().includes(filtros.nome.toLowerCase())
            })
    }

    if (filtros.area) {
        resposta = resposta.filter((pessoa) => {
            return pessoa.area.toLowerCase().includes(filtros.area.toLowerCase())
        })
    }

    res.json(resposta)
})

api.get("/pessoas/:id", (req, res)=>{
    const id = req.params.id

    res.json(pessoas.filter((pessoa)=>{
        return pessoa.id == id
    }))
})

api.post("/pessoas", (req, res)=>{
    const pessoa = req.body

    if (pessoa.idade == null || pessoa.area == null || pessoa.nome == null) {
        return res.json({
            mensagem: "Error, informação faltando."
        })
    }

    pessoas.push(pessoa)
    res.json({
        mensagem: "OK. Pessoa adicionada na lista."
    })
})

api.delete("/pessoas/:id", (req, res) => {
    const id = req.params.id

    const indice = pessoas.findIndex((pessoa) => {
        return pessoa.id == id
    })

    if (indice == -1) {
        return res.json ({
            mensagem: "Pessoa não encontrada!"
        })
    }

    pessoas.splice(indice,1)

    res.json({
        mensagem: `Pessoa com id ${id} foi apagada!`
    })
})

api.patch("/pessoas/:id", (req, res) => {
    const id = req.params.id
    const dados = req.body

    const indice = pessoas.findIndex ((pessoa) => {
        return pessoa.id == id
    })

    if (indice == -1) {
        return res.json ({
            mensagem: "Pessoa não encontrada"
        })
    }

    if (dados.nome != undefined) pessoas[indice].nome = dados.nome
    if (dados.idade != undefined) pessoas[indice].idade = dados.idade
    if (dados.area != undefined) pessoas[indice].area = dados.area

    res.json({
        mensagem: "Pessoa atualizada",
        pessoa: pessoas[indice]
    })
    
})

api.put("/pessoas/:id", (req, res) =>{
    const id = req.params.id
    const dados = req.body

    const indice = pessoas.findIndex ((pessoa) => {
        return pessoa.id == id
    })

    if (indice == -1) return res.json ({mensagem: "Pessoa não encontrada!"})

    if (dados.nome && dados.idade && dados.area) {
        pessoas[indice] = {
            id: id,
            nome: dados.nome,
            idade: dados.idade,
            area: dados.area
        }

        return res.json ({
            mensagem: "Pessoa atualizada completamente",
            pessoa: pessoas[indice]
        })
    } else {
        return res.json ({
            mensagem: "Informações faltando para ser atualizado"
        })
    }
})


api.listen(porta, ()=>{
    console.log(`Servidor está rodando http://localhost:${porta}`)
})