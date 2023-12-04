const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnDescansoCurto = document.querySelector('.app__card-button--curto');
const btnDescansoLongo = document.querySelector('.app__card-button--longo');
const btnTimer = document.querySelector('#start-pause span');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musica = document.querySelector('.toggle-checkbox');
const display = document.querySelector('#timer');

const audio = new Audio ("/sons/luna-rise-part-one.mp3");
const audioStart = new Audio ("/sons/play.wav");
const audioPause = new Audio ("/sons/pause.mp3");
const audioFinalizandoTempo = new Audio ("/sons/beep.mp3");

display.textContent = "25:00";
audio.loop = true;
var cronometro = null;
var tempo = 60 * 25;

btnFoco.addEventListener("click", () => {
    alteraFoco("foco");
});

btnDescansoCurto.addEventListener("click", () => {
    alteraFoco("descanso-curto");
});

btnDescansoLongo.addEventListener("click", () => {    
    alteraFoco("descanso-longo");
});

function alteraFoco(contexto) {
    html.setAttribute("data-contexto", contexto);
    imagem.setAttribute("src", `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            btnFoco.classList.add("active");
            btnDescansoCurto.classList.remove("active");
            btnDescansoLongo.classList.remove("active");
            tempo = 60 * 25;
            display.textContent = "25:00";
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            btnDescansoCurto.classList.add("active");
            btnFoco.classList.remove("active");
            btnDescansoLongo.classList.remove("active");
            tempo = 60 * 5;
            display.textContent = "05:00";
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            btnDescansoLongo.classList.add("active");
            btnFoco.classList.remove("active");
            btnDescansoCurto.classList.remove("active");
            tempo = 60 * 15;
            display.textContent = "15:00";
            break;
        default:
            break;
    } 
}

musica.addEventListener("change", () => {    
    if (audio.paused){
        audio.play();
    }
    else {
        audio.pause();
    }
})

const contagemRegressiva = () => {
    tempo -= 1;
    const segundos = new Date (tempo * 1000);
    const tempoFormatado = segundos.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    
    display.textContent = tempoFormatado;

    if (tempo <= 6) {
        audioFinalizandoTempo.play();
    }
    if (tempo <= 0) {
        pararTimer();
    }
}

btnTimer.addEventListener("click", startPauseTimer);

function startPauseTimer() {
    if (cronometro){
        audioPause.play();
        pararTimer();
        return
    }  
    cronometro = setInterval (contagemRegressiva, 1000);
    btnTimer.textContent = "Pausar";
    btnTimer.setAttribute("src", "/imagens/pause.png");
    audioStart.play(); 
}

function pararTimer() {
    clearInterval(cronometro);
    btnTimer.textContent = "Começar";
    btnTimer.setAttribute("src", "/imagens/play_arrow.png");
    cronometro = null;
}





