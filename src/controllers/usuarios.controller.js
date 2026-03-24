import { usuarios } from "../data/usuarios.js"

export function listarUsuarios(req, res) {
	return res.json(usuarios)
}


// Criar a rota de criar usuário
export function criarUsuario(req, res) {
	const { nome, email } = req.body

	if (nome === undefined || email === undefined) {
		return res.json({
			mensagem: "Erro, informação faltando."
		})
	}

	const novoUsuario = {
		id: usuarios.length + 1,
		nome,
		email
	}

	usuarios.push(novoUsuario)

	return res.json({
		mensagem: "Usuário criado com sucesso",
		usuario: novoUsuario
	})
}


// Criar uma rota para buscar usuários por ID
export function buscarUsuarioPorId(req, res) {
	const id = Number(req.params.id)

	const usuario = usuarios.find(u => u.id === id)

	if (usuario == null) {
		return res.json({
			mensagem: "Usuário não encontrado"
		})
	}

	return res.json(usuario)
}


// Criar uma rota para deletar um usuário por ID
export function deletarUsuario(req, res) {
	const id = Number(req.params.id)

	const index = usuarios.findIndex(u => u.id === id)

	if (index === -1) {
		return res.json({
			mensagem: "Usuário não encontrado"
		})
	}

	const usuarioRemovido = usuarios.splice(index, 1)

	return res.json({
		mensagem: "Usuário removido com sucesso",
		usuario: usuarioRemovido[0]
	})
}


//Criar uma rota para atualizar um usuário por ID
export function atualizarUsuario(req, res) {
	const id = Number(req.params.id)
	const { nome, email } = req.body

	// validação básica
	if (nome == null || email == null) {
		return res.json({
			mensagem: "Erro, informação faltando."
		})
	}

	// encontrar o usuário
	const usuario = usuarios.find(u => u.id === id)

	if (usuario == null) {
		return res.json({
			mensagem: "Usuário não encontrado"
		})
	}

	// atualizar os dados
	usuario.nome = nome
	usuario.email = email

	return res.json({
		mensagem: "Usuário atualizado com sucesso",
		usuario
	})
}