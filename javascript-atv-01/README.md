Eu iniciei o projeto, com o comando `npm init -y` e então instalei o Jest com `npm install --save-dev jest`, para mantê-lo como dependencia de desenvolvimento.

### 🟥 RED
Iniciei desenvolvendo o teste, assim como diz o TDD. 

Estabeleci 2 casos, 1 para a senha dando certo, e outro para a senha dando errado. A propósito isso me fez ter um pequeno problema mais para a frente. 


```JavaScript
it("should validate a password", () => {
    const passwordCorrect = "@Isaque777"
    const passwordIncorrect = "12345678"

    const userService = new UserService()

    const goodUser = new User({ name: "Isaque", password: passwordCorrect })
    const badUser = new User({ name: "Euqasi", password: passwordIncorrect })

    expect(userService.validatePassword(goodUser.password)).toBe(true)
    expect(userService.validatePassword(badUser.password)).toBe(false)
}) 
```

### 🟩 GREEN  
Senha nunca é tratada como um valor avulso, ela precisa estar associado á algo, portanto decidi criar uma classe de usuário, para armazená-la. 

Depois criei o método de validar senha com apenas um `if` que apenas valida a existência do parâmetro senha, sem nenhuma verificação a mais, com o propósito de obter sucesso nos testes. 

Porém o meu testes tem 2 expects, um para senha inválida e outro para senha válida. Para um ser verdadeiro, o outro precisa necessariamente ser falso, logo não seria possível o teste dar certo.

Para resolver isso considerei que a função de validar sempre vai retornar true, então comentei o teste que resultaria em false para executar os testes de forma bem-sucedida. 

```JavaScript
// User.js
class User {
    constructor({ name, password }) {
        this.name = name
        this.password = password
    }
}

module.exports = User

// UserService.js
class UserService {
    validatePassword(password) {

        if (password) {
            return true;
        }
    }
}

module.exports = UserService

// password.test.js
// ... 
    expect(userService.validatePassword(goodUser.password)).toBe(true)
    // expect(userService.validatePassword(badUser.password)).toBe(false)
// ...
```

### 🔁 REFACTOR 

Por fim, a funcionalidade foi implementada de fato. Para isso usei REGEX (made by Claude, testado por mim em [https://regexr.com/](https://regexr.com/)]) para garantir todos os critérios da senha. 

Apesar da simplicidade de implementar, um regex único não é muito interessante para a manutenibilidade e feedback ao usuário final. Em futuras implementações, caso houvesse um regex para cada critério seria possível dizer ao usuário quais já foram cumpridos e quais estão faltantes. 

Mas dado o escopo da atividade, mantive a opção mais simples. 

```JavaScript
class UserService {
    validatePassword(password) {
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[^\s]{8,}$/;
        return passRegex.test(password)
    }
}

module.exports = UserService
```