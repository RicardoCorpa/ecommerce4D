// alterar_produto.js

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
        document.getElementById("product-rating").value = product.avaliacao;
        document.getElementById("product-description").value =
          product.descricao;
        document.getElementById("product-price").value =
          product.preco.toFixed(2);
        document.getElementById("product-stock").value = product.estoque;
        document.getElementById("main-image").value =
          product.imagemPrincipal + 1;
        document.getElementById("product-group").value = product.grupo;

        // Carregar e mostrar as imagens atuais do produto pode ser adicionado aqui
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

// Função para atualizar o produto
function updateProduct(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém os valores dos campos
  const productId = new URLSearchParams(window.location.search).get("id");
  const productName = document.getElementById("product-name").value;
  const productRating = parseFloat(
    document.getElementById("product-rating").value
  );
  const productDescription = document.getElementById(
    "product-description"
  ).value;
  const productPrice = parseFloat(
    document.getElementById("product-price").value
  );
  const productStock = parseInt(document.getElementById("product-stock").value);
  const productImages = document.getElementById("product-images").files;
  const mainImageIndex = parseInt(document.getElementById("main-image").value);
  const productGroup = document.getElementById("product-group").value;

  // Validações adicionais podem ser feitas aqui
  // Verifica se os campos foram preenchidos corretamente, etc.

  // Prepara os dados do produto
  const productData = {
    nome: productName,
    avaliacao: productRating,
    descricao: productDescription,
    preco: productPrice,
    estoque: productStock,
    grupo: productGroup,
    imagens: [], // Adicione aqui os dados das imagens
    imagemPrincipal: mainImageIndex - 1, // Índice da imagem principal (baseado em 0)
  };

  // Processa as imagens, se houver novas imagens para adicionar
  if (productImages.length > 0) {
    for (let i = 0; i < productImages.length; i++) {
      const image = productImages[i];
      const reader = new FileReader();

      reader.onload = function (event) {
        const imageData = event.target.result;
        const imageName = `produto_${Date.now()}_${i}.jpg`; // Exemplo de nomeação da imagem
        productData.imagens.push({
          nome: imageName,
          dados: imageData,
        });

        // Salva a imagem no banco de dados ou sistema de armazenamento
      };

      reader.readAsDataURL(image);
    }
  }

  // Envia os dados atualizados do produto ao back-end
  fetch(`https://api.seusistema.com/produtos/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Produto atualizado com sucesso
        alert("Produto atualizado com sucesso!");
        // Redireciona para a lista de produtos
        window.location.href = "listar_produtos.html";
      } else {
        // Exibe mensagem de erro
        document.getElementById("error-message").textContent = data.message;
      }
    })
    .catch((error) => {
      console.error("Erro ao atualizar produto:", error);
      document.getElementById("error-message").textContent =
        "Ocorreu um erro ao atualizar o produto.";
    });
}

// Função para cancelar e voltar para a lista de produtos
function cancel() {
  window.location.href = "listar_produtos.html";
}

// Inicializa a tela de alteração de produto
document.addEventListener("DOMContentLoaded", function () {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    loadProductData(productId);
  } else {
    console.error("ID do produto não fornecido.");
    alert("Erro ao carregar os dados do produto.");
  }
});
