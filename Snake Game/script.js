$(document).ready(function () {
    $("#game-over").hide();
})

$("#reiniciar").click(function () {
    location.reload();
})

// Carregando sons
var fail = new Audio();
fail.src = "sounds/fail.wav";
var scor = new Audio();
scor.src = "sounds/score.wav";
var game_over = new Audio();
game_over.src = "sounds/game-over.wav";

// Verificação se a tela foi carregada para iniciar o jogo
window.onload = function () {
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");

    // Variáveis utilizadas na execução do código
    // X = Posição horizontal
    // Y = Posição vertical
    snake = [];
    posicaoX = 10;
    posicaoY = 10;
    comida_posicaoX = 15;
    comida_posicaoY = 15;
    velocidadeX = 0;
    velocidadeY = 0;
    grid = 20; //Controlando a grade: 20 quadradinhos de 20x20 = 400px
    tamanho_cobra = 3;
    pontuacao = 0;

    //Chama outra função a cada X milisegundos
    setInterval(jogo, 100);

    document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            // Seta direita
            case 39:
                velocidadeX = 1;
                velocidadeY = 0;
                break;

            // Seta esquerda
            case 37:
                velocidadeX = -1;
                velocidadeY = 0;
                break;

            // Seta cima
            case 38:
                velocidadeX = 0;
                velocidadeY = -1;
                break;

            // Seta baixo
            case 40:
                velocidadeX = 0;
                velocidadeY = 1;
                break;
        }
    });
}

function jogo() {
    // Configuração da tela
    contexto.fillStyle = "#FFFFFF";
    // Distância da borda horizontal, distância da vorda vertical, largura, altura 
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    // Deslocamento da cobra
    posicaoX += velocidadeX;
    posicaoY += velocidadeY;


    // Game Over
    if (posicaoX == -2) {
        $("#game-over").show();
        game_over.play();
    }

    if (posicaoX == grid + 1) {
        $("#game-over").show();
        game_over.play();
    }

    if (posicaoY == -2) {
        $("#game-over").show();
        game_over.play();
    }

    if (posicaoY == grid + 1) {
        $("#game-over").show();
        game_over.play();
    }

    // Configuração da cobra
    contexto.fillStyle = "#00f102";
    for (let i = 0; i < snake.length; i++) {
        contexto.fillRect(snake[i].x * grid, snake[i].y * grid, grid, grid);
        if (snake[i].x == posicaoX && snake[i].y == posicaoY) {
            tamanho_cobra = 3;
            pontuacao = 0;
            document.getElementById("pontos").innerHTML = pontuacao;
            if (posicaoX != 10 && posicaoY != 10) {
                fail.play();
            }
        }
    }

    // Posicionando a cobra
    snake.push({
        x: posicaoX,
        y: posicaoY
    })

    // Apagando
    while (snake.length > tamanho_cobra) {
        snake.shift();
    }

    // Configurando a comida
    contexto.fillStyle = "#EC407A";
    contexto.fillRect(comida_posicaoX * grid, comida_posicaoY * grid, grid - 1, grid - 1)

    // Comendo a comida
    if (posicaoX == comida_posicaoX && posicaoY == comida_posicaoY) {
        tamanho_cobra++;
        pontuacao++;
        document.getElementById("pontos").innerHTML = pontuacao;
        scor.play();
        // Recalculando de maneira aleatória a posição da comida
        comida_posicaoX = Math.floor(Math.random() * grid);
        comida_posicaoY = Math.floor(Math.random() * grid);
    }
}

function controlesFixos(seta) {
    switch (seta) {
        case "direita":
            velocidadeX = 1;
            velocidadeY = 0;
            break;

        case "esquerda":
            velocidadeX = -1;
            velocidadeY = 0;
            break;

        case "cima":
            velocidadeX = 0;
            velocidadeY = -1;
            break;

        default:
            velocidadeX = 0;
            velocidadeY = 1;
            break;
    }
}
