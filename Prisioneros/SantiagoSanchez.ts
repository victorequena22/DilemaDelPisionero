import { Prisionero } from "../Prototipos/Prisionero";
//reservado
//sigue un ciclo fijo de 3 rondas que determina si coopera o confiesa. La decisión se basa solo en la historia de interacciones 
//con su cómplice, pero sigue una estrategia no reactiva, más bien planeada.
//Primera ronda (coopera), Segunda Ronda (Coopera si el complice tambien coopero la ronda anterior y si el complice traicionó, el confiesa.)
//Tercera ronda (siempre confiesa sin importar que hizo el complice)
//V31926589

/***************************************************************/
/** Esto esta correcto pero se usa mas para la implementacion  */
/** de metodos publicos fuera de la clase no esta demas pero   */
/** tampoco es necesario ya eque solo lo usas una ves.         */
/** Si mueves el metodo a Prisionero puedes implementarlo en   */
/** el mismo                                                   */
/***************************************************************/
interface EstrategiaDecision {
  decidir(historial: boolean[]): boolean;
}

class EstrategiaReservada implements EstrategiaDecision {

  /***************************************************************/
  /** Esta funcion la puedes poner dentro de la clase prisionero */
  /** usando un # al principio para colocarla en privado         */
  /***************************************************************/
  decidir(historial: boolean[]): boolean {
    /***************************************************************/
    /** Esto lo podrias haber echo dentro de la funcion confesar   */
    /** sin cambios de logica.                                     */
    /***************************************************************/
    /* desde aqui */
    const ronda = historial.length % 3;
    if (ronda === 0) {
      return false; // coopera
    } else if (ronda === 1) {
      const ultima = historial[historial.length - 1];
      return !ultima; // coopera si el otro cooperó antes
    } else {
      return true; // confiesa
    }
    /* Hasta aqui */
  }
}


export class SantiagoSanchez extends Prisionero {

  /***************************************************************/
  /** Esto esta correcto pero no tiene el # para ponerlo privado */
  /** aunque el lengueje permite colocar private en la sintaxis  */
  /** lo que determina si es privada es el # al pricipio         */
  /***************************************************************/
  private estrategia: EstrategiaDecision;

  constructor() {
    super();
    this.setNombre("Santiago Sanchez");
    this.estrategia = new EstrategiaReservada();
  }

  confesar(): boolean {
    const historialComplice = this.getHistorial(this.getComplice().getNombre());
    return this.estrategia.decidir(historialComplice);
  }
}
