const Adicionar = document.querySelector('#adicionar')
const BotaoAdicionarCarta = document.querySelector('#BotaoAdicionarCarta')
const BotaoLimpar = document.querySelector('.limpar')
const Cartas = document.querySelector('.cartas')


let DicionarioCartas = []

let contador = 0
let ContadorPrafrente = false


// Testa se o contador é igual a posição da carta e decide se ira mostrar ela ou não
function MostrarOuOcultarCartas() {
    let cartasAtuais = document.querySelectorAll(".cartao")

    cartasAtuais.forEach((carta,index) => {
        if (index == contador) {
            carta.classList.remove('hidden')
        } else {
            if (carta.classList.contains('hidden')) {
                
            } else {
                carta.classList.add('hidden')
            }
        }
    })
}



window.addEventListener('keyup', (e) => {
    let cartasAtuais = document.querySelectorAll(".cartao")

    if(e.key == "ArrowRight") {
        if (contador < cartasAtuais.length-1) {
            contador++
            console.clear()
            console.log(contador) 
        } else {
            contador = 0
            console.clear()
            console.log(contador)
        }
    } 
    if(e.key == "ArrowLeft") {
        if (contador <=0) {
            contador = cartasAtuais.length-1
            console.clear()
            console.log(contador)
        } else {
            contador--
            console.clear()
            console.log(contador) 
        }
        
    }
    MostrarOuOcultarCartas()
    
})


function CarregarCartas(TituloDaCarta,ConteudoDaCarta) {
    const novaCarta = document.createElement('div');
    novaCarta.classList.add('cartao', 'hidden');
    novaCarta.innerHTML = `
        <b>${TituloDaCarta}</b>
        <p>${ConteudoDaCarta}</p>
        <button class="editar"><img src="./img/edit.png" alt="" height="15"></button>
        <button class="excluir"><img src="./img/lixo.png" alt="" height="15"></button>
    `;

    Cartas.appendChild(novaCarta);

    const botaoEditar = novaCarta.querySelector('.editar');
    botaoEditar.addEventListener('click', EditarCartaAtual);
    const botaoExcluir = novaCarta.querySelector('.excluir');
    botaoExcluir.addEventListener('click', ExcluirCartaAtual);
    
}

function AdicionaAoDicionario( Titulo, Conteudo) {

    DicionarioCartas.push(
        {
            TituloDaCarta: `${Titulo}`,
            ConteudoDaCarta: `${Conteudo}`
        }
    )

}

function AdicionaNoLocalStorage(Identificacao, Valor) {
    localStorage.setItem(Identificacao, Valor)
}

function CarregarCartasDoLocalStorage() {
    if (localStorage.getItem("carta") != null) {
        CartasDoLocalStorage = JSON.parse(localStorage.getItem("carta"))
        CartasDoLocalStorage.forEach((carta, index) => {
            CarregarCartas(CartasDoLocalStorage[index].TituloDaCarta, CartasDoLocalStorage[index].ConteudoDaCarta)
            AdicionaAoDicionario(CartasDoLocalStorage[index].TituloDaCarta,  CartasDoLocalStorage[index].ConteudoDaCarta)
        });
    }
    let cartasAtuais = document.querySelectorAll(".cartao")
    contador = cartasAtuais.length-1
}




CarregarCartasDoLocalStorage()
MostrarOuOcultarCartas()

let BotaoAdicionarAtivo = false

function CriarCarta() {
    
    if (BotaoAdicionarAtivo == false) {
        Adicionar.insertAdjacentHTML('beforeend',`<input type='text' id='titulo' placeholder='Insira um titulo'></input>
            <input type='text' id='conteudo' placeholder='Insira a descrição'></input>`) 
            
        let CampoConteudoCard = document.querySelector('#conteudo')
            
            
            
        CampoConteudoCard.addEventListener('keypress', function(event) {
                
            if (event.key === 'Enter') {
                    
                let TituloCard = document.querySelector('#titulo')
                let ConteudoCard =document.querySelector('#conteudo')
                    
                CarregarCartas(TituloCard.value,ConteudoCard.value);
        
                let cartasAtuais = document.querySelectorAll(".cartao")
                    
                contador = cartasAtuais.length-1
        
                AdicionaAoDicionario(TituloCard.value, ConteudoCard.value);
                AdicionaNoLocalStorage("carta",JSON.stringify(DicionarioCartas));
                    
                TituloCard.value = " "
                ConteudoCard.value = " "
            }
        })
        BotaoAdicionarAtivo = true
    } else {
        const inputTitulo = document.querySelector('#titulo')
        const inputDescricao = document.querySelector('#conteudo')
        inputTitulo.remove()
        inputDescricao.remove()
        BotaoAdicionarAtivo = false
    }
    
    
}

function LimparLocalStorage() {
    localStorage.clear()
    DicionarioCartas = []
    location.reload()
}

function EditarCartaAtual() {
    let NomeDaCarta = prompt('Insira o novo nome da carta')
    let DescricaoDaCarta = prompt('Insira a nova Descrição da carta')
    if (NomeDaCarta == "" || NomeDaCarta == null || DescricaoDaCarta == "" || DescricaoDaCarta == null) {

    } else {
        let cartasAtuais = document.querySelectorAll(".cartao")
        cartasAtuais.forEach((cartao,index) => {
            if (index == contador) {
                cartasAtuais[index].innerHTML = `
                    <b>${NomeDaCarta}</b>
                    <p>${DescricaoDaCarta}</p>
                    <button class="editar"><img src="./img/edit.png" alt=""height="15"></button>
                    <button class="excluir"><img src="./img/lixo.png" alt=""height="15"></button>`

                const botaoEditar = cartasAtuais[index].querySelector('.editar');
                botaoEditar.addEventListener('click', EditarCartaAtual);
                const botaoExcluir = cartasAtuais[index].querySelector('.excluir');
                botaoExcluir.addEventListener('click', ExcluirCartaAtual);
             

                DicionarioCartas[contador-1].TituloDaCarta = NomeDaCarta
                DicionarioCartas[contador-1].ConteudoDaCarta = DescricaoDaCarta
                AdicionaNoLocalStorage("carta",JSON.stringify(DicionarioCartas));
            }
        })
    }
    console.log(NomeDaCarta,DescricaoDaCarta)
}

function ExcluirCartaAtual() {
    let cartasAtuais = document.querySelectorAll(".cartao")
    cartasAtuais.forEach((cartao,index) => {
        if (index == contador) {
            cartasAtuais[index].remove()
            contador--
            MostrarOuOcultarCartas()
            console.log(contador)

            DicionarioCartas.splice(index-1,1)
            AdicionaNoLocalStorage("carta",JSON.stringify(DicionarioCartas))


        }
    })
}




BotaoAdicionarCarta.addEventListener('click', CriarCarta)
BotaoLimpar.addEventListener('click', LimparLocalStorage)


