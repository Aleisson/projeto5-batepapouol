// entrar na sala
let cadastro;
let promisse;
let lista = [];
let paraTodos;
let onlineSim;
let message;
let ultimaMenssagem;
cadastrarUsuario();
function cadastrarUsuario() {
    cadastro = prompt("Qual é o seu lindo nome?");
    const pergunta = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
        {
            name: cadastro
        }
    );

    pergunta.then(acessoLiberado);
    pergunta.catch(acessoNegado);
    setInterval(envioDeMensagem, 3000)
}

function acessoLiberado() {
    alert("Acesso Liberado!");
    buscarMensagem();
}

function acessoNegado() {
    alert("Cadastre um novo nome! Esse já existe!")
    cadastrarUsuario();
}
//manter conexão

informarConexao();
function informarConexao() {
    promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: cadastro
    });
    promisse.then(simConectado);
    promisse.catch(naoConectado);
}

function simConectado(type) {
    if (type.message !== undefined) {
        promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
            type: message
        });
        promisse.then(envioDeMensagem);
    }
}

function naoConectado(erro) {
    if (erro.type === undefined) {
        const li = document.querySelector(".mensagem-status");
        li.innerHTML = `${cadastro}`;
    }
    clearInterval(simConectado);
}

//buscarMensagens
function mensagemScroll() {
    const elementosAparecer = document.querySelector('.enviarMensagem').value;
    elementosAparecer.scrollIntoView();

}

function reloadThePage() {
    window.location.reload(".enviarMensagem").value;
}

function buscarMensagem() {
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(executarResposta);

}

function executarResposta(response) {
    lista = response.data;
    renderizarTodasMensagens();
}

function renderizarTodasMensagens() {

renderizarMensagemStatus();
renderizarMensagemParaTodos();
}

function renderizarMensagemParaTodos() {
    paraTodos = document.querySelector(".mensagem-normal");
    paraTodos.innerHTML = "";
    for (let i = 0; i > lista.length; i++) {
        if (lista[i].type === "message") {
            paraTodos.inneHTML += `
            <li class="mensagem-normal">
            <p><span class="hora">${lista[i].time}</span> <span class ="usuario">${lista[i].from}</span><span class="status">${lista[i].message}</span></p>
        </li>
         `
        }
    }
    ultimaMenssagem = 
    envioDeMensagem();
}

function renderizarMensagemStatus() {
    onlineSim = document.querySelector(".mensagem-status");
    onlineSim.innerHTML = "";
    for (let i = 0; i > lista.length; i++) {
        if (lista[i].type === "status") {
            onlineSim.inneHTML += `
            <li class="mensagem-status">
            <p><span class="hora">${lista[i].time}</span> <span class ="usuario">${lista[i].from}</span><span class="status">${lista[i].message}</span></p>
        </li>
         `
        }
    }

    envioDeMensagem();
}

//enviar mensagem para o servidor  AJEITAR
function envioDeMensagem() {
    const usuario = document.querySelector(".mensagem");
    const text = document.querySelector(".digitarMensagem").value;
     message = document.querySelector(".mensagem-status .mensagem-normal");
    const todos = document.querySelector(".mesagem-normal");

    const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",
        {
            from: usuario,
            to: todos,
            text: text,
            type: message
        }
    );
    enviarMensagem.then(renderizarMensagemParaTodos);
    console.log(enviarMensagem)
}

function digitarMensagem(input) {
    if (input.value === message) {
        let acionarIcone = document.querySelector(".icone")
        acionarIcone.classList.add("mensagem")
    }
}
digitarMensagem();
