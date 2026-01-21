import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";
// Nombre: Gabriel Caceres
// Cedula: 30.178.819
// El prisionero empieza cooperando
// Si el cómplice confiesa 2 veces seguidas, bandera de castigo y confieso siempre.
// Si no, uso espejo: repito la última jugada del cómplice.


export class GabrielCaceres extends Prisionero {

  nota = 1;
  // La bandera esta correcta pero si no tienes una forma de salir del castigo entoces no es diferente de honesto
  // Solucion 1: Busca una forma de hacerlo para que solo funcione con un colice conrecto el castigo es decir que el casti le toque al complice correspondiente
  // Solucion 2: Busca una forma de salir del modo castigo para aue no se quede bloqueado en honesto
  #castigo: boolean = false; // bandera


  constructor() {
    super();
    this.nombre = "Gabriel Caceres";
  }

  confesar(_i: Interrogador): boolean {
    const lista_historial = this.historial;
    if (this.complice.nombre === "Juan Cortez") {  // Bandera 
      return true;
    }
    else {

      if (lista_historial.length === 0) return false;

      const ultima = lista_historial.at(-1);
      const penultima = lista_historial.at(-2);


      if (ultima === true && penultima === true) this.#castigo = true;

      if (this.#castigo) return true;


      return ultima === true;
    }
  }
}