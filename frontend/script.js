/*
=====================================
  FRONT-END — consome nossa API local
=====================================

Este arquivo roda no navegador.
Ele faz requisições para nossa API Node.js
e mostra os dados na tela.
*/


// ==============================
// ELEMENTOS DO HTML
// ==============================

// pega o elemento <img id="dogImage">
// será usado para mostrar a foto do cachorro
const dogImage = document.getElementById("dogImage");

// pega o elemento que mostra o nome da raça
const breedName = document.getElementById("breedName");

// botão que busca um cachorro aleatório
const randomBtn = document.getElementById("randomBtn");

// botão que busca cachorro por raça
const searchBtn = document.getElementById("searchBtn");

// campo de texto onde o usuário digita a raça
const breedInput = document.getElementById("breedInput");

// área onde fica a imagem do cachorro
// usamos querySelector porque é uma classe (.dog-area)
const dogArea = document.querySelector(".dog-area");


// ==============================
// URL DA NOSSA API
// ==============================

// endereço base da nossa API local
// localhost = computador do próprio usuário
// porta 3000 = onde o servidor Node está rodando
const API = "http://localhost:3000/api/cachorros";


// ==============================
// FUNÇÃO PRINCIPAL
// ==============================

// função assíncrona que busca um cachorro na API
// recebe uma URL como parâmetro
async function buscarCachorro(url) {

    // adiciona a classe "loading"
    // normalmente usada para mostrar animação de carregamento
    dogArea.classList.add("loading");

    try {

        // faz a requisição HTTP para a API
        const response = await fetch(url);

        // converte a resposta para JSON
        const data = await response.json();

        // mostra no console a resposta da API
        console.log("Resposta da API:", data);

        // verifica se a API retornou erro
        if (data.status === "error") {

            // mostra a mensagem de erro na tela
            breedName.textContent = data.message;

            // remove a imagem
            dogImage.src = "";

            // para a execução da função
            return;
        }

        // coloca a imagem do cachorro na tela
        // o src define qual imagem será exibida
        dogImage.src = data.message;

        // extrai o nome da raça da URL da imagem
        // exemplo da URL:
        // http://localhost:3000/fotos/husky/1.jpg

        // separa a URL em partes usando "/"
        const partes = data.message.split("/");

        // pega a posição 5 do array
        // que corresponde ao nome da raça
        const raca = partes[5];

        // coloca a primeira letra maiúscula
        // ex: husky → Husky
        breedName.textContent =
            raca.charAt(0).toUpperCase() + raca.slice(1);

    } catch (erro) {

        // caso o servidor esteja desligado
        // ou aconteça algum erro na requisição

        // mostra erro no console
        console.error(erro);

        // mostra mensagem na tela
        breedName.textContent =
            "⚠️ Servidor offline — rode: node server.js";

        // remove a imagem
        dogImage.src = "";

    } finally {

        // remove a classe de carregamento
        // independentemente de erro ou sucesso
        dogArea.classList.remove("loading");

    }

}


// ==============================
// AÇÕES
// ==============================


// função que busca um cachorro aleatório
function cachorrroAleatorio() {

    // chama a função principal
    // passando a rota /aleatorio da API
    buscarCachorro(`${API}/aleatorio`);
}


// função que busca cachorro por raça
function buscarPorRaca() {

    // pega o texto digitado no input
    const raca = breedInput.value.trim().toLowerCase();

    // verifica se o usuário digitou algo
    if (!raca) {

        // se não digitou, mostra alerta
        alert("Digite uma raça!");

        // interrompe a função
        return;
    }

    // chama a API passando a raça na URL
    // exemplo: /api/cachorros/husky
    buscarCachorro(`${API}/${raca}`);
}


// ==============================
// EVENTOS
// ==============================


// quando clicar no botão "Aleatório"
randomBtn.addEventListener("click", cachorrroAleatorio);


// quando clicar no botão "Buscar"
searchBtn.addEventListener("click", buscarPorRaca);


// quando clicar na imagem do cachorro
// carrega outro cachorro aleatório
dogImage.addEventListener("click", cachorrroAleatorio);


// quando o usuário apertar ENTER no input
breedInput.addEventListener("keypress", (event) => {

    // verifica se a tecla pressionada foi Enter
    if (event.key === "Enter") {

        // executa a busca por raça
        buscarPorRaca();
    }

});


// ==============================
// CARREGA AO ABRIR A PÁGINA
// ==============================


// assim que a página abre
// já busca um cachorro aleatório
cachorrroAleatorio();