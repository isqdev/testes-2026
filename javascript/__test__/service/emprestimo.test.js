const { Livro } = require("../../src/models/Livro")
const { Usuario } = require("../../src/models/Usuario")
const { EmprestimoService } = require("../../src/service/EmprestimoService")

test('Testa usuário e livro válido', () => {
    // Arrange
    const user = new Usuario({ id: 1, nome: "Isaque", ativo: true, emprestimosAtivos: 2, multaPendente: 20})
    const livro = new Livro({ id: 1, titulo: "O Senhor dos Anéis", disponivel: true })
    // Act
    const saida = EmprestimoService.autorizarEmprestimo(user, livro)

    // Assert
    expect(saida).toBe(true)

})