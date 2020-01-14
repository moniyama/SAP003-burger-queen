# Burger Queen

## Índice

- [1. Resumo do Projeto](#1-resumo-do-projeto)
- [2. Considerações Técnicas](#2-considerações-técnicas)
- [3. Protótipo e Teste de Usabilidade](#3-protótipo-e-teste-de-usabilidade)
- [4. Futuras Implantações](#4-futuras-implantações)

---

## 1. Resumo do Projeto

A finalidade do projeto é a criação de uma interface para gerir os pedidos de um restaurante.

Os pedidos ao serem realizados devem ser encaminhados para a cozinha. Ao finalizar a preparação do itens, o pedido deve ser encaminhado para entrega.

![burger-queen](Tablet_web.png)

### 1.1 Funcionamento

A aplicação tem três abas de utilização:

- Menu Pedidos: Nessa seção, o usuário (Atendente) pode adicionar ou excluir itens ao pedido. Ao adicionar hamburgueres (simples ou duplo) é possivel selecionar o sabor de Hamburguer (Bovino, Frango ou Vegetariano). Além disso, por um adicional de R\$ 1,00 , eles podem adicionar queijo ou ovo. Ao finalizar, é necessário colocar o nome do cliente e a mesa em que ele se localiza. Pode-se também excluir todo o pedido no botão cancelar.
- Em Preparação: Nessa seção, o usuário (Cozinheiro(a))visualiza os pedidos em ordem em que são feitos. Ao finalizar a preparação, o usuário deve concluir a preparação e enviar para entrega. Além disso, consegue visualizar os últimos pedidos e o tempo de preparo (ao ser pedido até a finalização do preparo)
- Em Entrega: Nessa seção, o usuário (Atendente) consegue visualizar os pedidos pronto para serem entregues, os ultimos pedidos entregues, e o tempo de atendimento total (do pedido até ser entregue)

## 2. Considerações Técnicas

A aplicação foi desenvolvida para ser um _Single Page App_, sendo utilizado o [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html). Além disso, a sua interface foi desenvolvida para ser utilizada em Tablets.

Dependencias utilizadas:

- [Firebase](https://firebase.google.com/?hl=pt-br)

- [Aphrodite](https://github.com/Khan/aphrodite)

- [React Bootstrap](https://react-bootstrap.github.io/)

- [Material UI Icons](https://material-ui.com/pt/components/material-icons/)

- [Babel](https://babeljs.io/)

- [webpack](https://webpack.js.org/)

## 3. Protótipo e Teste de Usabilidade

Pensando no usuário, foi desenvolvido o protótipo no [Marvel](https://marvelapp.com/dashboard/). Buscou-se uma interface limpa, clara e objetiva, com a menor quantidade de cliques para maior facilidade e agilidade.

No teste de usabilidade, foi identificado a necessidade de incluir o botão para excluir o item e cancelar todo o pedido, que foi implementado na aplicação.

![Protótipo](prototype.PNG)

## 4. Futuras Implantações

- Deixar a aplicação offline.

- Necessidade de Login, no qual o usuário possa criar login e senha, e acessar apenas a tela correspondente a sua função (cozinha / salão).

- Uma página gerencial, que visualiza todos os pedidos em ordem de criação e seus respectivos estados.

- Faça testes que cubram 100% de statements, functions, lines e branches.
