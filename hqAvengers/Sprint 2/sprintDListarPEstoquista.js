// alterar_estoque.js

// Função para carregar os dados do produto com base no ID
function loadProductData(productId) {
  // Substitua a URL abaixo pela URL de sua API backend para obter os dados do produto
  fetch(`https://api.seusistema.com/produtos/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const product = data.product;

        // Preenche os campos com os dados do produto
        document.getElementById("product-name").value = product.nome;
        document.getElementById("product-stock").value = product.estoque;
      } else {
        console.error("Erro ao carregar produto:", data.message);
        alert("Erro ao carregar os dados do produto.");
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar produto:", error);
      alert("Erro ao carregar os dados do produto.");
    });
}

// Função para atualizar a quantidade de estoque
function updateStock(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém o ID do produto
  const productId = new URLSearchParams(window.location.search).get("id");

  // Obtém o valor do estoque atualizado
  const updatedStock = parseInt(document.getElementById("product-stock").value);

  // Atualiza a quantidade de estoque no banco de dados
  fetch(`https://api.seusistema.com/produtos/${productId}/update-stock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estoque: updatedStock }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Quantidade de estoque atualizada com sucesso!");
        // Redireciona para a lista de produtos
        window.location.href = "listar_produtos.html";
      } else {
        console.error("Erro ao atualizar estoque:", data.message);
        alert("Erro ao atualizar a quantidade de estoque.");
      }
    })
    .catch((error) => {
      console.error("Erro ao atualizar estoque:", error);
      alert("Erro ao atualizar a quantidade de estoque.");
    });
}

// Função para cancelar e voltar para a lista de produtos
function cancel() {
  window.location.href = "listar_produtos.html";
}

// Inicializa a tela de alteração de estoque
document.addEventListener("DOMContentLoaded", function () {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    loadProductData(productId);
  } else {
    console.error("ID do produto não fornecido.");
    alert("Erro ao carregar os dados do produto.");
  }
});
