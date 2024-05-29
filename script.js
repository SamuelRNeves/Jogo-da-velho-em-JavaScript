//initial date
//Função que representa o tabuleiro  
    let square = {
        a1:'',a2:'',a3:'',
        b1:'',b2:'',b3:'',
        c1:'',c2:'',c3:'',
    };
//Função que representa a vez da jogada
    let player = '';
//Função que dá o aviso
    let warning='';
//Função para seber se o jogo ainda está rodando
    let playing= false;

    reset()

//Events 
//Evento de click que chama o elemento html "reset"
document.querySelector('.reset').addEventListener('click',reset);
//usa o forEach para passar por cada elemento e adiciona um evento de click
document.querySelectorAll('.item').forEach(function (item){
    item.addEventListener('click',itemClick);
})


//functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    console.log('clicou em ', item)
    if(playing && square[item] === ''){
       square[item] = player;
    renderSquare();
    togglePlayer(); 
}
}
//Função que limpa tudo
function reset(){
    warning = '';
    //cria um número aleatório multiplica por 2 e arredonda para baixo
    let random = Math.floor(Math.random()*2);
    //condição para seber se a variável recebrá x ou o 
    player = (random === 0) ? 'x': 'o';
    // vai iterar sobre o 'square' e zerar
    for (let i in square){
        square[i] = '';
    };
    //Reinicia o jogo
    playing = true;

    renderSquare();
    renderInfo();
};


//Função para preecher o quadro 
function renderSquare(){
    for(let i in square ){
      let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
};
function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

};
function togglePlayer(){
    player = (player === 'x')? 'o' : 'x';
    renderInfo()
}
function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
    }else if (checkWinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;

    }else if (isFull()){
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player){
    let pos =[
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];
    for(let w in pos){
        let pArray = pos [w].split(',');
        let haswon = pArray.every(option => square[option] === player);
        if(haswon){
            return true;
        }
            
           
    }
    return false;
}

function isFull(){
    for (let i in square){
        if(square[i] === ''){
            return false;
        }
    }

    return true; 
}