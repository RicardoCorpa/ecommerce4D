// Adiciona evento de submissão ao formulário de cadastro
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const group = document.getElementById("group").value;

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      document.getElementById("error-message").textContent =
        "As senhas não coincidem.";
      return;
    }

    // Verifica se o CPF é válido (adicione sua própria lógica de validação de CPF)
    if (!isValidCPF(cpf)) {
      document.getElementById("error-message").textContent = "CPF inválido.";
      return;
    }

    // Encripta a senha antes de enviá-la ao backend
    const encryptedPassword = hashPassword(password);

    // Prepara os dados para enviar ao backend
    const userData = {
      nome: nome,
      cpf: cpf,
      email: email,
      password: encryptedPassword,
      group: group,
      status: true, // Usuário é cadastrado como ativo por padrão
    };

    // Envia os dados ao backend para cadastrar o usuário
    fetch("https://api.seusistema.com/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Cadastro realizado com sucesso, redireciona para a página de listar usuários
          window.location.href = "listar_usuarios.html";
        } else {
          // Exibe mensagem de erro em caso de falha
          document.getElementById("error-message").textContent = data.message;
        }
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
        document.getElementById("error-message").textContent =
          "Ocorreu um erro ao cadastrar o usuário.";
      });
  });

// Função para validar CPF (adicione sua própria implementação)
function isValidCPF(cpf) {
  // Lógica para validar o CPF, pode ser uma biblioteca ou sua própria implementação
  // Esta função retorna verdadeiro se o CPF é válido e falso caso contrário
  // Substitua por sua própria lógica de validação
  return true;
}

// Função para encriptar a senha (use um método seguro de hash)
function hashPassword(password) {
  // Adicione sua lógica de hash seguro aqui
  // Por exemplo, você pode usar a biblioteca `crypto-js` ou outra de sua escolha
  // Esta função deve retornar a senha criptografada
  return password; // Substitua por sua lógica de hash seguro
}
