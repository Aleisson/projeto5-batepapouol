// entrar na sala
let cadastro = prompt("Qual é o seu lindo nome?");
let promisse;
let listaMensagem = [];
cadastrarUsuario();
function cadastrarUsuario() {

    const pergunta = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
        {
            name: cadastro
        }
    );
    pergunta.then(acessoLiberado);
    pergunta.catch(acessoNegado);
}

function acessoLiberado(response) {

    if (response.status === 200) {
        alert("Acesso Liberado!");
    }
    // mensagem entrou na sala
    const li = document.querySelector(".mensagem-status");
    li.innerHTML = `${cadastro} entra na sala... `;
}

function acessoNegado(erro) {

    if (erro.response.status === 400) {
        prompt("Cadastre um novo nome!");
    }
}

//manter conexão
informarConexao();
function informarConexao() {
    console.log(informarConexao)
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
        setInterval(simConectado, 5000)
    }
}

function naoConectado(erro) {
    if (erro.type === undefined) {
        const li = document.querySelector(".mensagem-status");
        li.innerHTML = `${cadastro} saiu na sala... `;
    }
    clearInterval(simConectado)
}

//buscarMensagens

function buscarMensagem() {
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(executarResposta);
    console.log(buscar)
}
function executarResposta(response) {
    lista = response.data;
}

function renderizarMensagemParaTodos() {
    const paraTodos = document.querySelector(".mensagem-normal");
    paraTodos.scrollIntoView();
    paraTodos.innerHTML = "";

    for (let i = 0; i > lista.length; i++) {
        paraTodos.inneHTML += `
        <li class="mensagem-normal">
        ${lista[i].type}
        </li>
`
    }
}

function renderizarMensagemStatus() {
    const status = document.querySelector(".mensagem-status");
    status.scrollIntoView();
    status = "";
    for (let i = 0; i > lista.length; i++) {
        status.inneHTML += `
        
        <li class="mensagem-status">
        ${lista[i].type}
        </li>
         `
    }
}
function renderizarMensagemReservada() {
    const reservada = document.querySelector(".mensagem-reservada");
    reservada.scrollIntoView();
    reservada.innerHTML = "";
    for (let i = 0; i < lista.length; i++) { //maior ou menor?
        resevarda += `
        <li class="mensagem-reservada">
            ${lista[i].type}
        </li>
   ` }
}

function envioDeMensagem(){

}