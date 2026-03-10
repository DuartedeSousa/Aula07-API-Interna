//======================================================
//NOSSA API DE CACHORROS
//Feita com Node.js + Express

//Agora as fotos NÃO são mais baixadas automáticamente.
//Elas devem existir manualmente na pasta:

// data/fotos/
//======================================================

//Importar o framework Express para criar o servidor
const express = require("express");

//Importar o CORS o CORS para permitir requisições de outros domínios (ex: front-end)
const cors = require("cors");

//Importar o módulo de arquivos do Node
const fs = require("fs");

//Importar utilidades para trabalhar com caminhos de arquivos
const path = require("path");

//Importar arquivos JSON que contém as raças e fotos
const cachorros = require("./data/dogs.json");

//Criar a aplicação Express
const app = express();

//definir a porta onde o servidor irá rodar
const PORT = 3000;

//Habilitar o uso de CORs na aplicação 
app.use(cors());

//======================================================
// SERVIR ARQUIVOS ESTÁTICOS
//======================================================

//Aqui estamos dizendo para o Express:
//"TUDOOOOOO que estiver na pasta data/fotos pode ser acessado pela URL /fotos"
app.use(
    "/fotos", //rota pública
    express.static(
        path.join(__dirname, "data/fotos")
        //caminho real da pasta no servidor
    )
);

//======================================================
// FUNÇÃO AUXILIAR
//======================================================

//Função que rcebe um array e retorna um item aleatório dele
function sortear(array){
    //gerar um número aleatório entre 0 e o tamanho do array
    const i = Math.floor(Math.random() * array.lentgh)
    //Math.random() vai gerar um número aleatório entre 0 e 1
    //array.length pega o tamanho do array (5 itens)
    //Math.floor arredondar o número para baixo

    //retorna o item sorteado
    return array[i];
}

//======================================================
// ROTAS API
//======================================================

//======================================================
// ROTA 1 - Cachorro aleatório
//======================================================

//http;//localhost:3000/api/cachorros/aleatório

app.get("/api/cachorros/aleatorio", (req, res) =>{
    //pegar todas as fotos de todas as raças
    //object.values pega os valores do objeto
    //flat transforma tudi em um único array
    const todasAsFotos = Object.values(cachorros).flat();

    //sortear uma foto aleatória
    const item = sortear(todasAsFotos)
    //Responder para o cliente em formato JSON
    res.json({
        //status da resposta
        status: "sucess",
        //URL da imagem que foi sorteada
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

//======================================================
// ROTA 2 - Cachorro por raça
//======================================================
//http://localhost:3000/api/cachorros/husky

app.get("/api/cachorros/:raca", (req, res) => {

    //pega o parâmetro da URL (ex: husky)
    const raca = req.params.raca.toLowerCase();

    //verifica se essa raça existe no JSON
    if(!cachorros[raca]){
        res.status(404).json({
            //status de erro
            status: "erro",
            //mensagem explicando o problema
            message: `Raça "${raca}" não encontrada`
        });
        //encerra a execução da rota
        return;
    }
    //sortear uma foto da raça solicitada
    const item = sortear(cachorros[raca]);
    //retorna a resposta em JSON
    res.json({
        //status de sucesso
        status: "sucess",
        //URL da imagem sorteada
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

//======================================================
// INICIA O SERVIDOR
//======================================================

//iniciar o servidor express
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
    console.log(`📁 Coloue as fotos manualmente em: data/fotos/`);
    
})