import { livros } from "../data/livros.js"

export function listarLivros(req, res) {
	return res.json(livros)
}

export function criarLivro(req, res) {
	const {titulo} = req.body

	if (titulo == null) {
		return res.json({
			mensagem: "Erro, título é obrigatório"
		})
	}

	const novoLivro = {
		id: livros.length + 1,
		titulo,
		usuarioId: null
	}

	livros.push(novoLivro)

	return res.json({
		mensagem: "Livro criado com sucesso",
		livro: novoLivro
	})
}

export function atualizarLivro(req, res) {
	const id = Number(req.params.id)
	const {titulo} = req.body

	const livro = livros.find(l => l.id === id)

	if (livro == null) {
		return res.json({
			mensagem: "Livro não encontrado"
		})
	}

	if (titulo == null) {
		return res.json({
			mensagem: "Erro, título é obrigatório"
		})
	}

	livro.titulo = titulo

	return res.json({
		mensagem: "Livro atualizado com sucesso",
		livro
	})
}

export function deletarLivro(req, res) {
	const id = Number(req.params.id)

	const index = livros.findIndex(l => l.id === id)

	if (index === -1) {
		return res.json({
			mensagem: "Livro não encontrado"
		})
	}

	const livroRemovido = livros.splice(index, 1)

	return res.json({
		mensagem: "Livro removido com sucesso",
		livro: livroRemovido[0]
	})
}