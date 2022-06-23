// perguntar o nome

function cadastrarUsuario() {
  
    const cadastro = prompt("Qual é o seu lindo nome?");
    const pergunta = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
        {
            name: cadastro
        }
    );
    pergunta.then(AcessoLiberado);
    pergunta.catch(nomeEnviadoComErro);
}
cadastrarUsuario();

function AcessoLiberado() {
    alert("Acesso liberado!");
}


function nomeEnviadoComErro(erro) {
    console.log(erro)
    if (erro.response.status === 400) {
        prompt("Cadastre um novo nome!");
    }
    if (erro.response.status === 200) {
        alert("Nome cadastrado com sucesso!");
    }
}

function buscarDados() {
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")

    buscar.then(AcessoLiberado);
}

