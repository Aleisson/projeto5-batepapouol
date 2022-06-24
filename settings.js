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


function simConectado(type){
if(type.message !== undefined){
     promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        type: message
    });
    setInterval(simConectado, 5000)
}
}

function naoConectado(erro){
    if(erro.type === undefined){
        const li = document.querySelector(".mensagem-status");
        li.innerHTML = `${cadastro} saiu na sala... `;
    }
clearInterval(simConectado)
}

//buscarMensagens

function buscarMensagem(){
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(executarResposta);
    console.log(buscar)
}
function executarResposta(response){
    console.log(executarResposta)
    lista = response.data;
}

function renderizarMensagem(){
    const mensagemStatus = document.querySelector(".mensagem-status");
    const mensagemReservada = document.querySelector(".mensagem-reservada");
    const mensagemParaTodos = document.querySelector(".mensagem-normal");

for(let i = 0; i > lista.length; i++){
   
   <div class="mensagem">
            <ul>
                <li class="mensagem-status" onclick="(this)"></li>
                <li class="mensagem-reservada"></li>
                <li class="mensagem-normal"></li>
            </ul>
        </div>
}
}