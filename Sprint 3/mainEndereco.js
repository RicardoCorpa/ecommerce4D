// Função para editar o endereço padrão
function editarEnderecoPadrao() {
    var enderecoPadrao = document.getElementById('endereco-padrao');
    if (enderecoPadrao.checked) {
        // Habilitar os campos do endereço padrão para edição
        document.getElementById('logradouro').disabled = false;
        document.getElementById('numero').disabled = false;
        document.getElementById('complemento').disabled = false;
        document.getElementById('bairro').disabled = false;
        document.getElementById('cidade').disabled = false;
        document.getElementById('uf').disabled = false;
    } else {
        alert('Você só pode editar o endereço padrão.');
    }
}

// Função para excluir endereço de entrega
function excluirEndereco() {
    // Marcar o endereço como excluído
    var endereco = this.parentElement;
    endereco.classList.add('excluido');
    endereco.querySelector('input[type="checkbox"]').disabled = true; // Desabilitar checkbox
}

// Função para fazer logout do sistema
function fazerLogout() {
    // Limpar a sessão do login do cliente
    // Por exemplo, você pode redirecionar para a página de login
    alert('Você foi desconectado.');
    window.location.href = 'pagina-de-login.html';
}

// Event listeners
document.getElementById('editar-endereco').addEventListener('click', editarEnderecoPadrao);

var botoesExcluir = document.querySelectorAll('.excluir-endereco');
botoesExcluir.forEach(function(botao) {
    botao.addEventListener('click', excluirEndereco);
});

document.getElementById('logout').addEventListener('click', fazerLogout);
