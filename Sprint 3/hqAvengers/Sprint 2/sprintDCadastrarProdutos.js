// cadastrar_produto.js

// Função para salvar o produto
function saveProduct(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém os valores dos campos
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

  // Processa as imagens
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

  // Envia os dados do produto ao back-end
  fetch("https://api.seusistema.com/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Produto cadastrado com sucesso
        alert("Produto cadastrado com sucesso!");
        // Redireciona para a lista de produtos
        window.location.href = "listar_produtos.html";
      } else {
        // Exibe mensagem de erro
        document.getElementById("error-message").textContent = data.message;
      }
    })
    .catch((error) => {
      console.error("Erro ao cadastrar produto:", error);
      document.getElementById("error-message").textContent =
        "Ocorreu um erro ao cadastrar o produto.";
    });
}

// Função para cancelar e voltar para a lista de produtos
function cancel() {
  window.location.href = "listar_produtos.html";
}
