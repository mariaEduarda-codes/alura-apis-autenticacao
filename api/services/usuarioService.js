const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
    async cadastrar(dto){
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        });

        if (usuario) {
            throw new Error("Usuário já cadastrado");
        }

        try {
            const senhaHash = await hash(dto.senha, 8);

            return await database.usuarios.create({
                id: uuid.v4,
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            });
        } catch (error) {
            throw new Error("Erro ao cadastrar usuário");
        }
    }

    async buscarTodosUsuarios() {
        return await database.usuarios.findAll();
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        });

        if (!usuario) {
            throw new Error("Usuário informado não cadastrado.");
        }

        return usuario;
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id);

        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email;
            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error("Erro ao editar usuario");
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id);
        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error("Erro ao deletar usuario");
        }
    }
}

module.exports = UsuarioService;