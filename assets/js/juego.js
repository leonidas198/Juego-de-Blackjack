

const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    // Referencias del html
    const btnPedir = document.querySelector('#btnpedir'),
    btnDetener = document.querySelector('#btndetener'),
    btnNuevo = document.querySelector('#btnnuevo');
    
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');
    
    
    const inicializarJuego = ( numbersPlayers = 2 ) => {
        deck = createDeck();

        puntosJugadores = [];
        for( let i = 0; i < numbersPlayers; i++  ) {
            puntosJugadores.push(0);
        }
         
        puntosHtml.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        
        btnDetener.disabled = false;
        btnPedir.disabled = false;
       
    }
    
    // Funcion para crear una nueva baraja
    const createDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i +tipo );
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo )
            }
        }
    
        
        return _.shuffle( deck );
        

    }



    // Funcion para tomar una carta

    const askLetter = () => {

        if( deck.length === 0 ) {
            throw 'Se terminaron las cartas';
        }

        return deck.pop();
        
    }

    //askLetter();
    const valorCarta = ( letter ) => {

        const valor = letter.substring(0, letter.length - 1);

        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
        // let puntos = 0;

        // if( isNaN( valor ) ) {

        //     puntos = ( valor === 'A' ) ? 11 : 10; 
            
        // } else {
            
        //     puntos = valor * 1;
        // }
        // console.log(puntos)
    };

    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta( carta );
        puntosHtml[ turno ].innerText = puntosJugadores[ turno ];
        return puntosJugadores[ turno ];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
      
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ){
                alert('Nadie gana');
            } else if( puntosComputadora > 21 ) {
                alert('Jugador gana');
            } else {
                alert('La compu gana');
            }
            }, 5);

    }

    // Turno de la compu
    const turnoPc = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = askLetter();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta(carta,  puntosJugadores.length - 1);          
                      
           
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();

    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = askLetter();

        const puntosJugador = acumularPuntos( carta, 0 ); 
        crearCarta(carta, 0); 
        
        

        if( puntosJugador > 21 ) {
            console.error('perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoPc( puntosJugador );
        } else if( puntosJugador === 21 ) {
            console.warn('21, Crack!'); 
            turnoPc( puntosJugador );
        }

    });

    btnDetener.addEventListener('click', () => {
        
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoPc( puntosJugadores[0] );
            
    })

    btnNuevo.addEventListener('click', ()=> {
        inicializarJuego();
    })

    return {
        newGame: inicializarJuego
    }


})();









