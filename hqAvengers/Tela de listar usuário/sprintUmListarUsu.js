// Fiz algumas anotações para ajudar vocês a linkar com o BACKEND caso tenham dificuldade
// Sigam os passos

// Array para armazenar a lista de usuários
let users = [];

// Função para carregar a lista de usuários do backend
function loadUsers() {
  // Para HENRIQUE, ENRICO e João: Substitua a URL abaixo pela URL da API backend para carregar os usuários
  fetch("https://api.seusistema.com/usuarios")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      displayUsers(users);
    })
    .catch((error) => {
      console.error("Erro ao carregar usuários:", error);
    });
}

// Exibe a lista de usuários na tabela
function displayUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    // Preenche os dados do usuário na linha
    row.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.status ? "Ativo" : "Inativo"}</td>
            <td>${user.grupo}</td>
            <td>
                <button class="alter" onclick="alterUser(${
                  user.id
                })">Alterar</button>
                <button class="toggle-status" onclick="toggleUserStatus(${
                  user.id
                })">${user.status ? "Desabilitar" : "Habilitar"}</button>
            </td>
        `;
    userList.appendChild(row);
  });
}

// Função para filtrar usuários por nome
function filterUsers(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const filterName = document.getElementById("filter-name").value.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(filterName)
  );
  displayUsers(filteredUsers);
}

// Redireciona para a página de alteração de usuário
function alterUser(userId) {
  // Redireciona para a página de alteração de usuário com o ID do usuário
  window.location.href = `alterar_usuario.html?id=${userId}`;
}

// Função para habilitar/desabilitar um usuário
function toggleUserStatus(userId) {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    console.error(`Usuário com ID ${userId} não encontrado.`);
    return;
  }

  // Solicita confirmação para habilitar ou desabilitar o usuário
  const action = user.status ? "desabilitar" : "habilitar";
  const confirmation = confirm(
    `Você tem certeza que deseja ${action} o usuário ${user.nome}?`
  );

  if (confirmation) {
    // Envia uma solicitação ao backend para alterar o status do usuário
    fetch(`https://api.seusistema.com/usuarios/${userId}/toggle-status`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Atualiza a lista de usuários após a mudança de status
          loadUsers();
        } else {
          console.error("Erro ao alterar status do usuário:", data.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao alterar status do usuário:", error);
      });
  }
}

// Função para inicializar a tela de listar usuários
document.addEventListener("DOMContentLoaded", function () {
  loadUsers();

  // Adiciona evento de envio ao formulário de filtro
  const filterForm = document.querySelector(".filter-form");
  if (filterForm) {
    filterForm.addEventListener("submit", filterUsers);
  }
});
