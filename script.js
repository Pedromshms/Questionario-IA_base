// Seleciona os elementos HTML que serão manipulados
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Array de objetos contendo as perguntas e alternativas
const perguntas = [
    {
        enunciado: "Qual a idade máxima que um cachorro pode chegar?",
        alternativas: [
            "15 anos",
            "20 anos"
        ],
        correta: 0 // A primeira alternativa é a correta
    },
    {
        enunciado: "Quantos dias há em um ano bissexto?",
        alternativas: [
            "365",
            "366"
        ],
        correta: 1 // A segunda alternativa é a correta
    },
    {
        enunciado: "Qual é o maior planeta do nosso sistema solar?",
        alternativas: [
            "Terra",
            "Júpiter"
        ],
        correta: 1
    },
    {
        enunciado: "Qual é a capital da França?",
        alternativas: [
            "Paris",
            "Londres"
        ],
        correta: 0
    },
    {
        enunciado: "Qual é a fórmula química da água?",
        alternativas: [
            "H2O",
            "CO2"
        ],
        correta: 0
    }
];

let atual = 0;
let perguntaAtual;
let pontuacao = 0;

// FUNÇÃO MOSTRAR PERGUNTA
function mostrarPergunta() {
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado; // Exibe a pergunta
    caixaAlternativas.innerHTML = ""; // Limpa as alternativas anteriores

    // Cria um botão para cada alternativa e adiciona o evento de clique
    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.addEventListener("click", () => verificaResposta(index)); // Verifica a resposta
        caixaAlternativas.appendChild(botao); // Adiciona o botão à caixa de alternativas
    });
}

// FUNÇÃO VERIFICAR RESPOSTA
function verificaResposta(selecionada) {
    if (selecionada === perguntaAtual.correta) {
        pontuacao++; // Incrementa a pontuação se a resposta estiver correta
    }
    atual++; // Avança para a próxima pergunta

    // Verifica se ainda existem perguntas para mostrar
    if (atual < perguntas.length) {
        mostrarPergunta(); // Mostra a próxima pergunta
    } else {
        mostrarResultado(); // Se não houver mais perguntas, mostra o resultado
    }
}

// FUNÇÃO MOSTRAR RESULTADO
function mostrarResultado() {
    // Esconde a caixa de perguntas
    caixaPrincipal.style.display = "none";
    // Mostra a caixa de resultado
    caixaResultado.style.display = "block";

    // Adiciona a classe 'mostrar' com uma animação de transição
    setTimeout(() => caixaResultado.classList.add("mostrar"), 10);

    // Exibe o texto do resultado com a pontuação
    textoResultado.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    // Cria o botão de reinício
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Reiniciar";
    botaoReiniciar.addEventListener("click", reiniciarQuiz); // Evento de reinício

    // Limpa e adiciona os elementos de resultado à caixa de resultado
    caixaResultado.innerHTML = ""; // Limpa a caixa de resultado
    caixaResultado.appendChild(textoResultado);
    caixaResultado.appendChild(botaoReiniciar);
}

// FUNÇÃO PARA REINICIAR O QUIZ
function reiniciarQuiz() {
    atual = 0;
    pontuacao = 0;

    // Limpa a classe 'mostrar' e esconde a caixa de resultado
    caixaResultado.classList.remove("mostrar");
    caixaResultado.style.display = "none";

    // Mostra a caixa de perguntas novamente
    caixaPrincipal.style.display = "block";

    // Reinicia o quiz mostrando a primeira pergunta
    mostrarPergunta();
}

// Inicia o quiz com a primeira pergunta
mostrarPergunta();
