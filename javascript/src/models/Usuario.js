class Usuario {
    constructor(
        {id, nome, ativo, empprestimosAtivos, multaPendente}
    ) {
        this.id = id;
        this.nome = nome;
        this.ativo = ativo;
        this.emprestimosAtivos = empprestimosAtivos;
        this.multaPendente = multaPendente;
    }
}

module.exports = { Usuario }