// Variáveis
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15
var criaMosquitoTempo = 1500
var pontuacao = 0


//Lógica para nível

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	//1500
	criaMosquitoTempo = 1500
} else if (nivel === 'dificil'){
	//1000
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknoris') {
	//750
	criaMosquitoTempo = 750
}

//FIM Lógica para nível

//Ajuste de Dimensão do Game
function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight // altura da janela
	largura = window.innerWidth // largura da janela
	console.log(altura, largura)
}
ajustaTamanhoPalcoJogo()
//Fim de ajuste de Dimensão do Game


//INICIO Logica Cronometro / Vitória
var cronometro = setInterval(function(){
	tempo --

	if (tempo < 0) {
		clearInterval(cronometro) //limpa o fluxo da memória da aplicação
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html?' + pontuacao
		
	} else{
		//logica cronomero
		document.getElementById('cronometro').innerHTML = tempo
	}
	
	
}, 1000)
//FIM Logica Cronometro / Vitória


//Criação de posição randômica

function posicaoRandomica() {

	//remover mosquito anterior caso exista
	if (document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()
		
		//removendo vida caso o mosquito não seja morto / Game Over
		if (vidas > 3) {
			//Game Over
			window.location.href= 'fim_de_jogo.html?' + pontuacao
		} else {
			//removendo vidas			
			document.getElementById('v' + vidas).src='imagens/coracao_vazio.png'

			vidas++
		}

	}

	var posicaoX = Math.floor(Math.random() * largura) - 90 //posicão randomica de 0 à max largura
	var posicaoY = Math.floor(Math.random() * altura) - 90 //posicão randomica de 0 à max altura

	posicaoX = posicaoX < 0 ? 0 : posicaoX // corrige posições negativa
	posicaoY = posicaoY < 0 ? 0 : posicaoY


	console.log (posicaoY, posicaoX)

	//Criar elemento html
	var mosquito = document.createElement('img') // criando elemento img
	mosquito.src = 'imagens/mosquito.png' //altera o atributo src do elemento img
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() // altera a classe do elemento

	mosquito.style.left = posicaoX + 'px' // altera o estilo de posição do elemento
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = mataMosquito //chama a função mataMosquito ao clicar no elemento

	document.body.appendChild(mosquito) // introduzindo elemento criado ao body

	console.log(tamanhoAleatorio())
	console.log(ladoAleatorio())
}
//Fim da posição randômica


//Criação tamanho randômico

function tamanhoAleatorio(){
	var classe = Math.floor(Math.random() * 3)

	switch(classe){
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}

}

//Fim do tamanho randômico



// Lado do mosquito Aleatório A B

function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2)

	switch(classe){
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
		
	}
}

// Fim Lado Aleatório

//Inicio função de clique no elemento

function mataMosquito(){
		this.remove()
		pontuacao ++
		document.getElementById('pontuacao').innerHTML = pontuacao
	}

//Fim função de clique no elemento