const { Livro } = require("../../src/models/Livro")
const { Usuario } = require("../../src/models/Usuario")
const { EmprestimoService } = require("../../src/service/EmprestimoService")
const { constantes } = require("../../src/util/constants")
const { mensagens } = require("../../src/util/mensagens")

const casos = require("../dados/emprestimo.json")

describe('Testa a função autorizarEmprestimo', () => {
    test('Testa usuário e livro válido', () => {
        // Arrange
        const user = new Usuario({ id: 1, nome: "Isaque", ativo: true, emprestimosAtivos: 2, multaPendente: 20})
        const livro = new Livro({ id: 1, titulo: "O Senhor dos Anéis", disponivel: true })
        // Act
        const saida = EmprestimoService.autorizarEmprestimo(user, livro)
        
        // Assert
        expect(saida).toBe(true)
        
    })
    
    test('Testa usuário e livro inválido', () => {
        // Arrange
    const user = new Usuario({ id: 1, nome: "Isaque", ativo: true, emprestimosAtivos: 2, multaPendente: 20})
    const livro = new Livro({ id: 1, titulo: "O Senhor dos Anéis", disponivel: false })
    // Act / Assert
    expect(() => EmprestimoService.autorizarEmprestimo(user, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL)
    
    })

    test('Testa usuário inválido e livro válido', () => {
        // Arrange
    const user = new Usuario({ id: 1, nome: "Isaque", ativo: false, emprestimosAtivos: 2, multaPendente: 20})
    const livro = new Livro({ id: 1, titulo: "O Senhor dos Anéis", disponivel: true })
    // Act
    const saida = EmprestimoService.autorizarEmprestimo(user, livro)
    
    // Assert
    expect(saida).toBe(false)
    
    })

    
    test('Testa usuário inválido e livro válido', () => {
        // Arrange
    const user = new Usuario({ id: 1, nome: "Isaque", ativo: true, emprestimosAtivos: constantes.USUARIO_LIMITE_EMPRESTIMOS + 5, multaPendente: 20})
    const livro = new Livro({ id: 1, titulo: "O Senhor dos Anéis", disponivel: true })
    // Act
    const saida = EmprestimoService.autorizarEmprestimo(user, livro)
    
    // Assert
    expect(saida).toBe(false)
    
    })

    test('Testa usuário inválido (MULTA) e livro válido', () => {
        // Arrange
    const user = new Usuario({ id: 1, nome: "Isaque", ativo: true, emprestimosAtivos: 2, multaPendente: constantes.USUARIO_LIMITE_MULTA})
    const livro = new Livro({ id: 1, titulo: "Chapeuzinho Verde", disponivel: true })
    // Act / Assert
    const saida = EmprestimoService.autorizarEmprestimo(user, livro)

    expect(saida).toBe(false)
})

    test.each(casos)('$descricao', (caso) => {
    const user = new Usuario({ id: 1, nome: "Isaque", ativo: caso.ativo, emprestimosAtivos: caso.emprestimosAtivos, multaPendente: caso.multaPendente})
    const livro = new Livro({ id: 1, titulo: "O Senhor dos Anéis", disponivel: caso.livroDisponivel })
        
    // Act    
    if (caso.livroDisponivel) {
        const saida = EmprestimoService.autorizarEmprestimo(user, livro)
        expect(caso.saida).toBe(saida)
    } else {
        // Act / Assert
        expect(() => EmprestimoService.autorizarEmprestimo(user, livro))
        .toThrow(mensagens.LIVRO_INDISPONIVEL)
    }
    
    })
})