import express from "express"

const porta = 3000 
const api = express()

/* 1) Uma variável de lista inicialmente vazia */

const produtos = []

api.use(express.json())

/* 2) Uma rota GET para retornar todos os produtos e pode ter filtragem por nome ou categoria */

api.get("/produtos", (req, res) => {
    const filtros = req.query   
    let resposta = produtos

    if (filtros.nome) {
        resposta = resposta.filter((produto) => {
            return produto.nome &&
                produto.nome.toLowerCase().includes(filtros.nome.toLowerCase())
        })
    }

    if (filtros.categoria) {
        resposta = resposta.filter((produto) => {
            return produto.categoria &&
                produto.categoria.toLowerCase().includes(filtros.categoria.toLowerCase())
        })
    }

    res.json(resposta)
})

/* 3) Uma rota POST para criar os produtos */

api.post("/produtos", (req, res) => {
    const produto = req.body

    if (
        produto.id == null ||
        produto.nome == null ||
        produto.preco == null ||
        produto.categoria == null
    ) {
        return res.status(400).json({
            mensagem: "Erro, informação faltando."
        })
    }

    produtos.push(produto)

    res.status(201).json({
        mensagem: "Novo produto adicionado na lista."
    })
})

/* 4) Uma rota GET para retornar apenas um produto em específico pelo id */

api.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)

    const item = produtos.find((produto) => {
        return produto.id === id
    })

    if (!item) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        })
    }

    res.json(item)
})

/* 5) Uma rota PUT para atualizar um registro */

api.put("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body

    const produto = produtos.find(p => p.id === id)

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        })
    }

    if (dados.nome != null) produto.nome = dados.nome
    if (dados.preco != null) produto.preco = dados.preco
    if (dados.categoria != null) produto.categoria = dados.categoria

    res.json({
        mensagem: "Produto atualizado com sucesso",
        produto
    })
})

/* 6) Uma rota DELETE para remover um registro */

api.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)

    const index = produtos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        })
    }

    produtos.splice(index, 1)

    res.json({
        mensagem: "Produto removido com sucesso"
    })
})

api.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
})