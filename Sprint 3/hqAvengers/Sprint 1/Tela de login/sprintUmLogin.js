document.getElementById("ok-button").addEventListener("click", function (e) {
  // Impede que o formulário seja enviado pelo navegador
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Hash da senha usando SHA-256 ou outra função de hash
  const hashedPassword = hashPassword(password);

  // Validar credenciais com o backend API
  validateLogin(email, hashedPassword).then((response) => {
    if (response.success) {
      // Login com sucesso
      // Redirecionado a página principal do backoffice
      window.location.href = "backoffice_main.html";
    } else {
      // Login negado
      // Colocar a mensagem de erro
      document.getElementById("error-message").textContent = response.message;
    }
  });
});

document.getElementById("cancel-button").addEventListener("click", function () {
  // Limpar o formulário e esconder mensagens de erro
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("error-message").textContent = "";
});

// Função para hash da senha usando uma função hash
function hashPassword(password) {
  // Use uma biblioteca ou função integrada para fazer o hash da senha
  return password; // Exemplo (use uma função de hash adequada na implementação real)
}

// Função para validar o login com o backend API
function validateLogin(email, hashedPassword) {
  return new Promise((resolve) => {
    // Validação simulada com o backend
    // Em uma implementação real, você usaria fetch ou axios para comunicar-se com a API do backend
    setTimeout(() => {
      // Exemplo de resposta do backend
      if (email === "admin@backoffice.com" && hashedPassword === "password") {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "Usuário ou senha incorretos." });
      }
    }, 1000);
  });
}
