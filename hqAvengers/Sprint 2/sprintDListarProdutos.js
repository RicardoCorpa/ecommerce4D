// listar_produtos.js

// Array para armazenar a lista de produtos
let products = [];
let currentPage = 1; // Página atual
const itemsPerPage = 10; // Número de itens por página

// Função para carregar a lista de produtos do backend
function loadProducts() {
  // Substitua a URL abaixo pela URL de sua API backend para carregar produtos
  fetch("https://api.seusistema.com/produtos")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Erro ao carregar produtos:", error);
    });
}

// Exibe a lista de produtos na tabela
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  // Pega os produtos da página atual
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = products.slice(start, end);

  currentProducts.forEach((product) => {
    const row = document.createElement("tr");

    // Preenche os dados do produto na linha
    row.innerHTML = `
            <td>${product.codigo}</td>
            <td>${product.nome}</td>
            <td>${product.estoque}</td>
            <td>${product.preco.toFixed(2)}</td>
            <td>${product.status ? "Ativo" : "Inativo"}</td>
            <td>
                <button onclick="viewProduct(${product.id})">Visualizar</button>
                <button onclick="editProduct(${product.id})">Alterar</button>
                <button onclick="toggleProductStatus(${product.id})">${
      product.status ? "Inativar" : "Ativar"
    }</button>
            </td>
        `;
    productList.appendChild(row);
  });

  displayPagination(); // Exibe a paginação
}

// Função para exibir a paginação
function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Limpa a paginação atual

  const totalPages = Math.ceil(products.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("button");
    pageLink.textContent = i;
    pageLink.onclick = () => goToPage(i);
    if (i === currentPage) {
      pageLink.disabled = true; // Desabilita o botão da página atual
    }
    pagination.appendChild(pageLink);
  }
}

// Função para mudar para uma página específica
function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayProducts(products);
}

// Função para filtrar produtos por nome
function searchProducts(event) {
  event.preventDefault();

  const searchTerm = document.getElementById("search-term").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm)
  );
  products = filteredProducts;
  currentPage = 1;
  displayProducts(products);
}

// Função para visualizar um produto
function viewProduct(productId) {
  // Redireciona para a página de visualização do produto
  window.location.href = `visualizar_produto.html?id=${productId}`;
}

// Função para editar um produto
function editProduct(productId) {
  // Redireciona para a página de edição do produto
  window.location.href = `editar_produto.html?id=${productId}`;
}

// Função para habilitar ou inabilitar o status de um produto
function toggleProductStatus(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    console.error(`Produto com ID ${productId} não encontrado.`);
    return;
  }

  const action = product.status ? "inativar" : "ativar";
  const confirmation = confirm(
    `Você tem certeza que deseja ${action} o produto ${product.nome}?`
  );

  if (confirmation) {
    // Envia uma solicitação ao backend para alterar o status do produto
    fetch(`https://api.seusistema.com/produtos/${productId}/toggle-status`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Atualiza o status do produto na lista
          product.status = !product.status;
          displayProducts(products); // Atualiza a exibição dos produtos
        } else {
          console.error("Erro ao alterar status do produto:", data.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao alterar status do produto:", error);
      });
  }
}

// Inicializa a tela de listar produtos quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  loadProducts(); // Carrega a lista de produtos

  // Adiciona evento de envio ao formulário de busca
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", searchProducts);
  }
});
