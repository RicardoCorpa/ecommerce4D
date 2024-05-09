document.getElementById('buscar-cep').addEventListener('click', function() {
    var cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('CEP inválido. Insira apenas os números.');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/');
    xhr.onload = function() {
        var data = JSON.parse(xhr.responseText);
        if (data.erro) {
            alert('CEP não encontrado. Verifique o número digitado.');
            return;
        }
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('uf').value = data.uf;
    };
    xhr.send();
});
