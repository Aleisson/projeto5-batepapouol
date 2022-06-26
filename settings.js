// entrar na sala
let cadastro;
let promisse;
let lista = [];
let paraTodos;
let onlineSim;
cadastrarUsuario();

/*function paginaPrincipal() {
    const usuario = document.querySelector(".apresentacao .input ");
    if (usuario.classList.contains("input").value) {
        usuario.ClassList.remove("container")
    }else{
        usuario.classList.remove("ocultar")
    } 
}
*/

function cadastrarUsuario() {
    cadastro = prompt("Qual é o seu lindo nome?");
    const pergunta = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
        {
            name: cadastro
        }
    );
    
    pergunta.then(acessoLiberado);
    pergunta.catch(acessoNegado);
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
        promisse.then(envioDeMensagem)
        setInterval(simConectado, 5000, cadastro)
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
/*function mensagemScroll() {
    const elementosAparecer = document.querySelector('.mensagem');
    elementosAparecer.scrollIntoView();
    
}/*
function reloadThePage() {
    window.location.reload();
}*/

function buscarMensagem() {
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(executarResposta);
   
}

function executarResposta(response) {
    lista = response.data;
    renderizarTodasMensagens();
    console.log(lista)
}

function renderizarTodasMensagens() {
    // for(let i =0; i < lista.length; i++){

    renderizarMensagemStatus();
    renderizarMensagemParaTodos();
    renderizarMensagemReservada();
}




function renderizarMensagemParaTodos() {
    paraTodos = document.querySelector(".mensagem-normal").value;
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
}

function renderizarMensagemStatus() {
    onlineSim = document.querySelector(".mensagem-status").value;
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
}

function renderizarMensagemReservada() {
    const reservada = document.querySelector(".mensagem-reservada").value;
    reservada.innerHTML = "";
    for (let i = 0; i < lista.length; i++) { //maior ou menor?
        reservada.innerHTML += `
        <li class="mensagem-reservada">
        <p><span class="hora">${lista[i].time}</span> <span class ="usuario">${lista[i].from}</span><span class="status">${lista[i].message}</span></p>
    </li>
   `
    }
}

//enviar mensagem para o servidor  AJEITAR

/*
function envioDeMensagem() {
    cadastro = document.querySelector(".mensagem").value;
    const online = document.querySelector(".mensagem-status").value;
    const paraTodos = document.querySelector(".mensagem-normal").value;
    const preparo = document.querySelector(".modo-preparo-receita").value;

    const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",
        {
            from: cadastro,
            to: paraTodos,
            text: value,
            type: promisse
        }
    );
    enviarMensagem.then(renderizarMensagemParaTodos);
    console.log(envioDeMensagem)







    const novaReceita = {
        titulo: nome,
        ingredientes: ingredientes,
        preparo: preparo
    };

    console.log(novaReceita);

    //Vou pegar a promise de retorno do envio para API - Quero pegar pode pode dar bom ou pode dar ruim
    const promise = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/tastecamp/receitas",
        novaReceita
    );
    //Quando a promise é resolvida com SUCESSO
    promise.then(buscarReceitas);
    //Quando a promise é resolvida com FALHA (API pode tá fora, ou você mandou uma receita errada)
    promise.catch(alertaErro);
}
  //Vai executar somente quando der ruim no POST
*/