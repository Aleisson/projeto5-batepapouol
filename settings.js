// entrar na sala
let cadastro = prompt("Qual é o seu lindo nome?");

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
   
    if(response.status === 200) {
        alert("Acesso Liberado!");
    }
    // mensagem entrou na sala
    const li = document.querySelector(".mensagem-status");
    li.innerHTML = `${cadastro} entra na sala... `;
    conectadosStatus();
}

function acessoNegado(erro) {
   
    if (erro.response.status === 400) {
        prompt("Cadastre um novo nome!");
    }
}

//manter conexão

function conectadosStatus() {
    
    if(cadastro.status !== undefined) {
        conectado = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
            {
                name: cadastro
            }
        )
        setInterval(conectado, 5000)
        conectado.then(mensagemStatus);
    }return //mensagem status
}

function mensagemStatus() {
    
    const msgStatus = document.querySelector(".mensagem-status")
    msgStatus.innerHTML = `${cadastro} saiu da sala... `;
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisse.then(acessoLiberado);

}
function mensagemErrro() {

}