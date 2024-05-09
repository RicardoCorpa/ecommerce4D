// Adiciona eventos de clique aos botões
document
  .getElementById("list-products-button")
  .addEventListener("click", function () {
    // Redireciona para a página de listar produtos
    window.location.href = "listar_produtos.html";
  });

document
  .getElementById("list-users-button")
  .addEventListener("click", function () {
    // Redireciona para a página de listar usuários
    window.location.href = "listar_usuarios.html";
  });

document
  .getElementById("list-orders-button")
  .addEventListener("click", function () {
    // Redireciona para a página de listar pedidos
    window.location.href = "listar_pedidos.html";
  });
