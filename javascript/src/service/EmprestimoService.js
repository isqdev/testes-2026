const constantes = require("../util/constants").constantes;

class EmprestimoService {
    static autorizarEmprestimo(usuario, livro) {
        return this.validarLivro(livro) && this.validarUsuario(usuario);
    }

    static validarUsuario(usuario) {
        if (!usuario.ativo) return false;

        if (usuario.emprestimosAtivos >= constantes.USUARIO_LIMITE_EMPRESTIMOS) return false;
        
        if (usuario.emprestimosAtivos >= constantes.USUARIO_LIMITE_MULTA) return false;
        
        return true;
    }

    static validarLivro(livro) {
        if (!livro.disponivel) return false;

        return true;
    }
}

module.exports = { EmprestimoService }