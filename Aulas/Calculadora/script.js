/* Variável global que armazena a expressão a ser calculada.*/
let expressao = '';

/* Função para concatenar valores à expressão.*/
function concatenar(valor) {
    expressao += valor;
    document.getElementById('display').value = expressao;
}

/* Função para limpar a expressão.*/
function limpar() {
    expressao = '';
    document.getElementById('display').value = '';
}

/*Função para calcular a expressão.*/
function calcular() {
// Avalia a expressão e atualiza o visor, ou exibe 'Erro' se houver um erro na expressão.
    document.getElementById('display').value = eval(expressao) || 'Erro';
}
function calcular() {
    // Avalia a expressão
    let resultado = eval(expressao);
    
    // Verifica se o resultado é um número
    if (!isNaN(resultado)) {
        // Formata o resultado com seis casas decimais após a vírgula
        resultado = parseFloat(resultado.toFixed(8));
    } else {
        // Se houver um erro na expressão, exibe 'Erro'
        resultado = 'Erro';
    }
    
    // Atualiza o visor com o resultado formatado
    document.getElementById('display').value = resultado;
}

