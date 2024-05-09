// Função para excluir um endereço de entrega
function excluirEndereco(event) {
    const botao = event.target;
    const endereco = botao.closest('.endereco');
    const enderecoId = endereco.dataset.id;

    // Marcar o endereço como excluído
    endereco.classList.add('excluido');
    botao.disabled = true; // Desabilitar o botão de exclusão
    console.log(`Endereço com ID ${enderecoId} marcado como excluído.`);
}

// Função para fazer logout do sistema
function fazerLogout() {
    // Exibir uma mensagem de confirmação antes de fazer logout
    const confirmarLogout = confirm('Você está prestes a sair do sistema. Deseja continuar?');
    if (confirmarLogout) {
        // Realizar ações de logout, como limpar a sessão
        console.log('Sessão limpa. Você foi desconectado.');
        alert('Você foi desconectado.');
        // Redirecionar para a página de login ou página inicial
        window.location.href = 'pagina-de-login.html';
    }
}

// Adiciona eventos aos botões de exclusão
const botoesExcluir = document.querySelectorAll('.excluir-endereco');
botoesExcluir.forEach((botao) => {
    botao.addEventListener('click', excluirEndereco);
});

// Adiciona evento ao botão de logout
const botaoLogout = document.getElementById('logout');
botaoLogout.addEventListener('click', fazerLogout);
