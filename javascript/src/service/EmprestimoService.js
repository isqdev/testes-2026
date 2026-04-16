const { mensagens } = require("../util/mensagens");

const constantes = require("../util/constants").constantes;

class EmprestimoService {
    static autorizarEmprestimo(usuario, livro) {
        return this.validarLivro(livro) && this.validarUsuario(usuario);
    }

    static validarUsuario(usuario) {
        if (!usuario.ativo) return false;

        if (usuario.emprestimosAtivos >= constantes.USUARIO_LIMITE_EMPRESTIMOS) return false;
        
        if (usuario.multaPendente >= constantes.USUARIO_LIMITE_MULTA) return false;
        
        return true;
    }

    static validarLivro(livro) {
        if (!livro.disponivel) throw new Error(mensagens.LIVRO_INDISPONIVEL);

        return true;
    }
}

module.exports = { EmprestimoService }