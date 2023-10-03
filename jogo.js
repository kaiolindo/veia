// seleciona todos os elementos com a classe "celula" e os armazena em uma lista.
const celulas = document.querySelectorAll(".celula");

// Inicializa a variálvel checarTudo como verdadira.
let checarTurno = true;

//inicializa a variável turno, que será usado para alterar entre "X" e "O".
let turno;

//Define contantes para representar os jogadores "x" e "O".
const JOGADOR_X = "X";
const JOGADOR_O = "O";

// Inicializada a variável jogoAcabou como falso, indicando que o jogo está em andamento.
let jogoAcabou = false;

// Adicione um evento de clique ao documento que é acionado quando qualquer elemento é clicado.
document.addEventListener("click", (event) => {
    // Verefica se o elemento  clicado possui a classe "celula" e se o jogo ainda não acabou.
    if (event.target.matches(".celula") && !jogoAcabou) {
        // Chama a função jogar, passando o ID do elemento clicado como argumento.
        jogar(event.target.id);
    }
});

// Função que representa a jogada de um jogador.
function jogar(id) {
    // Obtém o elemento com o ID correspondente ao argumento passado.
    const celula = document. getElementById(id);

    //verifica se o conteúdo da célula está vazio, ou seja se ainda não foi jogado.
    if (celula.textContent === "") {
        //determina qual jogador está fazendo a jogada com base na variável checarTurno.
        turno = checarTurno ? JOGADOR_X : JOGADOR_O;
        
        // Inverte o valor da variável checarTudo para alternar entre os jogadores
       checarTurno = !checarTurno;
        
       // Define o conteúdo da célula como o símbolo do jogador atual
        celula.textContent = turno;

        // Adiciona a classe correspondente ao jogador atual à célula para estilização.
        celula.classList.add(turno);

        // Remove o evento de clique da célula para evitar jogadas repetidas. 
        celula.removeEventListener("click", jogar);

        // Chama a função verificarVencedor para vereficar se o jogador atual venceu 
         verificarVencedor(turno);
    }

}


function verificarVencedor(jogador) {
    const combinacoesVitoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4 ,8],
        [2, 4 ,6],
    ]; 
     
    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (
            celulas[a].textContent === jogador &&
            celulas[b].textContent === jogador &&
            celulas[c].textContent === jogador 
        ) {
            jogoAcabou = true;
            alert(`O jogador ${jogador} venceu!`);
            return;
        }
    }


    if ([...celulas].every((celula) => celula.textContent !=="")) {
        jogoAcabou = true;
        alert("Empate!");
    }
}