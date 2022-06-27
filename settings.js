let nome;
let lista = [];
let paraTodos;
let onlineSim;
let message;
let texto;

// entrar na sala
cadastrarUsuario();
function cadastrarUsuario() {
    nome = prompt("Qual é o seu lindo nome?");

    usuario = {
        name: nome
    }

    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);
   
    promisse.then(acessoLiberado);
    promisse.catch(acessoNegado);
}

function acessoLiberado() {
    alert("Acesso Liberado!");
    buscarMensagem();
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
    usuario = {
        name: nome
    }
    const informar = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario)
   informar.then(buscarMensagem);
   console.log("INFORMAR")
   // setInterval(informarConexao, 5000, usuario)
    }
clearInterval(informarConexao)


//buscarMensagens
function buscarMensagem() { //SUCESSO
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(executarResposta);
   // setInterval(buscarMensagem, 3000)
    console.log("buscar")
    informarConexao();
}
function executarResposta(response) {
    lista = response.data;
}


function renderizarMensagem() {

    let exibirMensagem = document.querySelector(".mensagem .escrever").value; //main
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
    ultimaMensagem.scrollIntoView(renderizarMensagem());
    executarResposta();
}


  function exibirMensagem(){
    let mensagemEscrita;
    let value = document.querySelector(".escrever").value;
   
    mensagemEscrita = {
        from: usuario, nome,
        to:"todos",
        text: value,
        type: "mensagem"
    }
   
   const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemEscrita)
   enviarMensagem.then(renderizarMensagem);
   enviarMensagem.catch();
   
   value.innerHTML = "";
    console.log("exibirMensagem");
    renderizarMensagem();
  }  

    


