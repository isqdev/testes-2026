`npm run test` para rodar o projeto.

### Resultados
Todos os testes passaram com sucesso, analisando o particionamento com os valores limites.

### Anomalias
Entretanto, testes randômicos definidos aleatóriamente por conveniência mostraram que passando o valor `20000.00` o resultado do teste é 1 centavo maior do que o resultado retornado no site da receita. 

Isso ocorre pois o arredondamento dos decimais para duas casas podem gerar ligeiras imprecisões. 

Apesar de ter encontrado uma única ocorrência em cerca de 10 testes randômicos com valores no intervalo de `1000.00` a `50000.00`, essa característica com certeza se repetirá em outros casos. 