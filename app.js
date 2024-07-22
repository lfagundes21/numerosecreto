let listaDeNumerosSorteados = []; //criando variável para listar numeros ja sorteados
let numeroLimite = 105
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto){ //criada função com parametros específicos
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // chamando a função reponsive voice para ler o texto, na linguagem "brazilian portugues female" e na velocidade 1.2
}

function exibirMensagemInicial(){

exibirTextoNaTela('h1','Jogo do Número Secreto'); //chamada da função passando os parametros
exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);

}

exibirMensagemInicial()

function verificarChute() {   // criando uma função para ser usada pelo HTML
    let chute = document.querySelector('input').value; //busca só o valor inserido na tela e não todo o html
    //console.log(numeroSecreto == chute) // faz uma comparação booleana, retornando true ou false
    if (chute == numeroSecreto){
        exibirTextoNaTela ('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // seta um valor para o campo, dependendo do resultado
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // habilitou o botão "novo jogo", removendo o atributo "disabled" que está setado no html
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela ('p',`O numero secreto é menor do que ${chute}`)
        }else {
            exibirTextoNaTela ('p',`O numero secreto é maior do que ${chute}`)
        }
        tentativas++ // soma 1 a variável tentativa

        limparcampo() // executa função de limpar campo
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [] // limpa todos os elementos da lista de numeros já sorteados.
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){ // se o numero ja existir na lista..
        return gerarNumeroAleatorio(); // recursão para "ressortear" o numero aleatório
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // insere o numero escolhido na lista no final dela;
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido; // retorna o numero escolhido para a função;
    }

}
function limparcampo(){
    chute = document.querySelector('input'); //buscando dados do campo chute
    chute.value = ''; //limpando os dados do campo
}

function reiniciarJogo(){ // função que reinicia o jogo, "resetando" variáveis
    numeroSecreto = gerarNumeroAleatorio();
    limparcampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // desabilitou o botão bnovo jogo
}