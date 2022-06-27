let nome;
let lista = [];
let paraTodos;
let onlineSim;
let message;

// entrar na sala
cadastrarUsuario();
function cadastrarUsuario() {
    nome = prompt("Qual é o seu lindo nome?");

    usuario = {
        name: nome
    }

    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
    setInterval(informarConexao, 5000, nome)
    promisse.then(acessoLiberado);
    promisse.catch(acessoNegado);
    console.log(promisse)
}

function acessoLiberado() {
    alert("Acesso Liberado!");
    // buscarMensagem();
    console.log("SIM")
}

function acessoNegado(erro) {
    if (erro.response === 400) {
        alert("Cadastre um novo nome! Esse já existe!");
    }
    cadastrarUsuario();
    console.log("NÃO")
}

//manter conexão
function informarConexao() {
    console.log("CONEXAO")
}
informarConexao();

//buscarMensagens
function buscarMensagem() {
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(executarResposta);
    setInterval(buscarMensagem, 3000)
    console.log("buscar")
}
function executarResposta(response) {
    lista = response.data;
    console.log("response")
    renderizarMensagemParaTodos();
}


function renderizarMensagem() {

    let exibirMensagem = document.querySelector(".mensagem"); //main
    for (let i = 0; i > lista.length; i++) {
        if (lista[i].type === "message") {
            exibirMensagem.inneHTML += `
            <li class="mensagem-normal">
            <p><span class="hora">${lista[i].time}</span> <span class ="usuario">${lista[i].from}</span><span class="status">${lista[i].message}</span></p>
        </li>
         `
        }
        if (lista[i].type === "status") {
            exibirMensagem.inneHTML += `
            <li class="mensagem-status">
            <p><span class="hora">${lista[i].time}</span> <span class ="usuario">${lista[i].from}</span><span class="status">${lista[i].message}</span></p>
        </li>
         `
        }
    }
    let ultimaMensagem = exibirMensagem.lastChild;
    ultimaMensagem.scrollIntoView();
    console.log(ultimaMensagem)
    digitarMensagem();
}

function exibirMensagem() {
    let escreverMensagem;

    const texto = document.querySelector(".rodape").value;
    escreverMensagem = {
        from: nome,
        to: "Todos",
        text: texto,
        type: "message"

    }
    const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", escreverMensagem);

    enviarMensagem.then();
    enviarMensagem.catch();
    document.querySelector("input").value = "";
}