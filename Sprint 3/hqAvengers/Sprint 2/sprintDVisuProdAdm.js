// visualizar_produto.js

// Função para carregar os detalhes do produto com base no ID
function loadProductDetails(productId) {
  // Substitua a URL abaixo pela URL de sua API backend para obter os dados do produto
  fetch(`https://api.seusistema.com/produtos/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const product = data.product;

        // Exibe os detalhes do produto
        const productDetails = document.getElementById("product-details");
        productDetails.innerHTML = `
                    <h3>${product.nome}</h3>
                    <p>Avaliação: ${product.avaliacao.toFixed(1)}</p>
                    <p>Descrição: ${product.descricao}</p>
                    <p>Preço: R$${product.preco.toFixed(2)}</p>
                    <p>Estoque: ${product.estoque}</p>
                    <p>Status: ${product.status ? "Ativo" : "Inativo"}</p>
                    <!-- Exibir as imagens do produto -->
                    <div class="product-images">
                        ${product.imagens
                          .map(
                            (image, index) => `
                            <img src="${image.caminho}" alt="${
                              product.nome
                            } imagem ${index + 1}">
                        `
                          )
                          .join("")}
                    </div>
                `;

        // Desabilitar o botão de comprar
        // O botão de comprar pode ser mostrado na interface conforme necessário
      } else {
        console.error("Erro ao carregar produto:", data.message);
        alert("Erro ao carregar os detalhes do produto.");
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar produto:", error);
      alert("Erro ao carregar os detalhes do produto.");
    });
}

// Função para voltar à página anterior
function goBack() {
  window.history.back();
}

// Inicializa a tela de visualizar produto
document.addEventListener("DOMContentLoaded", function () {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    loadProductDetails(productId);
  } else {
    console.error("ID do produto não fornecido.");
    alert("Erro ao carregar os detalhes do produto.");
  }
});
