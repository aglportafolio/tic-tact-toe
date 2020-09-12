import { Component, OnInit } from '@angular/core';
import { Celda } from '../Modelo/Celda';

/**
 * Jugador A Jugador
 * Jugador B Computadora
 */
const Ficha = {
  JugadorA: 'X',
  JugadorB: 'O',
  JugadorN: '-'
};

@Component({
  selector: 'app-gato',
  templateUrl: './gato.component.html',
  styleUrls: ['./gato.component.css']
})
export class GatoComponent implements OnInit {
  public  Tablero: any;
  public numeroCeldasVacias: number;
  public turno: string;
  public rootValues: any;
  public ArrayJugador: any;
  /*Deshabilitar boton */
  public buttonDisabled: boolean;
  public desahabilitarBotonJuego: boolean;
  /*Mensaje de fin del juego*/
  public MensajeFinJuego: string;
  public banderaFinJuego: boolean;
  public ocultarMensajeDanger: boolean;
  public ocultarMensajeSuccess: boolean;
  public ocultarMensajeWarning: boolean;
  constructor() { }

  ngOnInit(): void {
    this.InicializaTablero();
    this.buttonDisabled = true ;
    this.desahabilitarBotonJuego = false;
    this.MensajeFinJuego = 'En juego seleccione una casilla';
    this.banderaFinJuego = false;
    this.ocultarMensajeDanger = true;
    this.ocultarMensajeSuccess = false;
    this.ocultarMensajeWarning = true;

  }
/**
 * Tarea de inciar las varibles del tablero
 */
  InicializaTablero(): void {
    const celda1 = new Celda(0, 0, Ficha.JugadorN);
    const celda2 = new Celda(0, 1, Ficha.JugadorN);
    const celda3 = new Celda(0, 2, Ficha.JugadorN);
    const celda4 = new Celda(1, 0, Ficha.JugadorN);
    const celda5 = new Celda(1, 1, Ficha.JugadorN);
    const celda6 = new Celda(1, 2, Ficha.JugadorN);
    const celda7 = new Celda(2, 0, Ficha.JugadorN);
    const celda8 = new Celda(2, 1, Ficha.JugadorN);
    const celda9 = new Celda(2, 2, Ficha.JugadorN);
    this.Tablero = []; /*[] es igual a new Array()*/
    this.Tablero.push(celda1);
    this.Tablero.push(celda2);
    this.Tablero.push(celda3);
    this.Tablero.push(celda4);
    this.Tablero.push(celda5);
    this.Tablero.push(celda6);
    this.Tablero.push(celda7);
    this.Tablero.push(celda8);
    this.Tablero.push(celda9);
    this.rootValues = [];
    this.ArrayJugador = [];
    for (let i = 0; i < 3; i++){
      for (let  j = 0; j < 3; j++){
          this.ArrayJugador[i] = Ficha.JugadorN;
      }
    }
    this.banderaFinJuego = false;
  }
  presion2() {

    
    this.ngOnInit();

   }
/*
 *Metodo cuando se selecciona una celda del juego Gato
 *x Fila
 *y columa
 *casilla celda seleccionada TypeSxcript no manjea arreglos bidimencionales
 */
  presionCelda(x: number, y: number, casilla: number) {

    
    if (this.Tablero[casilla].getFicha() === '-'  ) {

      const celda: Celda = new Celda(x, y, Ficha.JugadorA);
      this.move(celda, Ficha.JugadorA);
      this.estausDelJuego();
      if (!this.banderaFinJuego){
      this.JuegaCompu();
      
      this.estausDelJuego();
      }
    }




  }
  JuegaCompu(): void{
   let score: number ;
   score = 0;
   this.turno = Ficha.JugadorB;

   this.callMinimax(0, Ficha.JugadorB);
   let mejorMovimiento: Celda;
   mejorMovimiento = this.getBestMove();
   this.move(mejorMovimiento, Ficha.JugadorB);

  }
  callMinimax(profundiad: number, fichaJuega: string): void {

    this.rootValues = [];
    const minmac: number = this.miniMax(profundiad, fichaJuega);

  }

  miniMax(profundiad: number, fichaJuega: string): number{
    if (this.esGanador( Ficha.JugadorB ) ) return +1;/*COMPOTADORA*/
    if (this.esGanador( Ficha.JugadorA ) ) return -1;/*COMPOTADORA*/

    // List<Cell> availableCells = getEmptyCells();
    let availableCells: any;
    availableCells = [];
    availableCells = this.getEmptyCells();

    if (availableCells.length === 0) return 0;

    let scores: any;
    scores = [];

    for (let i = 0; i < availableCells.length; i++) {
      let point: Celda;
      point = availableCells[i];

      if (fichaJuega === Ficha.JugadorB) {
        this.move(point, Ficha.JugadorB);
        const currentScore: number = this.miniMax(profundiad + 1, Ficha.JugadorA);
        scores.push(currentScore);

        if (profundiad === 0) {
          point.setMinimaxValue(currentScore);
          
          this.rootValues.push(point);
        }


      }else
      if (fichaJuega === Ficha.JugadorA) {
        this.move(point, Ficha.JugadorA);
        scores.push(this.miniMax(profundiad + 1, Ficha.JugadorB));
       }

      this.move(point, Ficha.JugadorN);

      }

    if ( fichaJuega === Ficha.JugadorB ){
          return this.returnMax(scores);
        }

    return this.returnMin(scores);
  }
  esGanador(ficha: string): boolean{
    let resultado: boolean;
    resultado = false;
    if (this.Tablero[0].getFicha() === ficha && this.Tablero[1].getFicha() === ficha && this.Tablero[2].getFicha() === ficha){
      resultado = true;
    }
    if (this.Tablero[3].getFicha() === ficha && this.Tablero[4].getFicha() === ficha && this.Tablero[5].getFicha() === ficha){
      resultado = true;
    }
    if (this.Tablero[6].getFicha() === ficha && this.Tablero[7].getFicha() === ficha && this.Tablero[8].getFicha() === ficha){
      resultado = true;
    }
    if (this.Tablero[0].getFicha() === ficha && this.Tablero[4].getFicha() === ficha && this.Tablero[8].getFicha() === ficha){
      resultado = true;
    }
    if (this.Tablero[2].getFicha() === ficha && this.Tablero[4].getFicha() === ficha && this.Tablero[6].getFicha() === ficha){
      resultado = true;
    }
    if (this.Tablero[0].getFicha() === ficha && this.Tablero[3].getFicha() === ficha && this.Tablero[6].getFicha() === ficha){
      resultado = true;
    }
    if (this.Tablero[1].getFicha() === ficha && this.Tablero[4].getFicha() === ficha && this.Tablero[7].getFicha() === ficha){
      resultado = true;
        }
    if (this.Tablero[2].getFicha() === ficha && this.Tablero[5].getFicha() === ficha && this.Tablero[8].getFicha() === ficha){
      resultado = true;
    }
    return resultado;
  }

  getEmptyCells(): any {

      let celdaVacia: any;
      celdaVacia = [];
      for (let i = 0; i < 9; ++i) {


                if (this.Tablero[i].getFicha() === Ficha.JugadorN) {
                   // celdaVacia.add(new Celda(i,0,Ficha.JugadorN))
                   celdaVacia.push(this.Tablero[i]);

            }
        }

      return celdaVacia;
    }
    hayCeldasDisponibles(): boolean {
      let hayCeldasVacias = true;
      for (let i = 0; i < 9; i++){
        if (this.Tablero[i].getFicha() === Ficha.JugadorN){
            hayCeldasVacias = false;
        }
      }

      return hayCeldasVacias;
    }
    move( point: Celda, turno: string) {
      for (let k = 0; k < 9; k++){
        if (this.Tablero[k].getX() === point.getX() && this.Tablero[k].getY() === point.getY()){
          this.Tablero[k].setFicha(turno);
          }
      }
    }
    returnMax(list: any): number{
      let index = -2;
      let max = -2;
      for (let i = 0; i < list.length; ++i) {
            if (list[i] > max) {
                max = list[i];
                index = i;
            }
        }
      return list[index];
    }
    returnMin(list: any): number{
      let index = -2;
      let min = 2;
      for (let i = 0; i < list.length; ++i) {
            if (list[i] < min) {
                min = list[i];
                index = i;
            }
        }
      return list[index];
    }
    getBestMove(): Celda {
     
      let max = -4;
      let best: number;
      best = -4;

      for (let i = 0; i < this.rootValues.length; ++i) {
          if ( max < this.rootValues[i].getMinimaxValue() ) {
                max = this.rootValues[i].getMinimaxValue();
                best = i;
            }
      }
      
      return this.rootValues[best];
    }
    isRunning(): boolean{
      let resultado = true;
      let hayCeldasDisponibles: boolean;
      hayCeldasDisponibles = true;
      const celdasDisponibles = this.getEmptyCells();
     
      if ( !this.esGanador(Ficha.JugadorA) || !this.esGanador(Ficha.JugadorB) ) {
        resultado = false;
      }
      return true;
    }

    estausDelJuego(){
      
      if (this.esGanador(Ficha.JugadorB)){
        this.MensajeFinJuego = 'Perdiste ';
        this.ocultarMensajeDanger = false;
        this.ocultarMensajeSuccess = true;
        this.desahabilitarBotonJuego = true;
        this.buttonDisabled = false ;
      }
      let hayCeldasDisponibles: boolean;
      hayCeldasDisponibles = true;
      const celdasDisponibles = this.getEmptyCells();
      if (celdasDisponibles.length === 0){
        hayCeldasDisponibles = false;
      }
      if (!hayCeldasDisponibles){
        this.MensajeFinJuego = 'Empate ';
        this.ocultarMensajeWarning = false;
        this.banderaFinJuego = true;
        this.desahabilitarBotonJuego = true;
        this.buttonDisabled = false ;
        this.ocultarMensajeSuccess = true;
      }
      if (this.esGanador(Ficha.JugadorA)){
        this.MensajeFinJuego = 'Ganaste ';
        this.banderaFinJuego = true;
        this.desahabilitarBotonJuego = true;
        this.buttonDisabled = false ;
      }
    }

}
