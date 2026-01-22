import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";
// Nombre: Gabriel Caceres
// Cedula: 30.178.819
//El prisionero confiesa si el cómplice se llama Juan Cortez o Diego Bustamante(para ellos siempre confiesa) 
// en caso de que los complices no sea ninguno de  ellos  comienza cooperando
//Si el complice confiesa dos veces seguidas se activa el modo castigo por 3 turnos y confiesa
// para salir del modo castigo el complice debe cooperar o despues de pasar los 3 turnos
//Si no esta en castigo, entra en espejo y copia la ultima acción del complice

export class GabrielCaceres extends Prisionero {

  nota = 19;
  #castigo: boolean = false; // bandera
  #turnosCastigo: number = 0; // contador


  constructor() {
    super();
    this.nombre = "Gabriel Caceres";
  }
  confesar(_i: Interrogador): boolean {
    const lista_historial = this.historial;
    if (this.complice.nombre === "Juan Cortez" || this.complice.nombre === "Diego Bustamante") {
      return true;
    }
    else {
      if (lista_historial.length === 0) return false;

      const ultima = lista_historial.at(-1) === true;
      const penultima = lista_historial.length >= 2 && lista_historial.at(-2) === true;

      if (!this.#castigo && penultima && ultima) {
        this.#castigo = true;
        this.#turnosCastigo = 3;
      }
      if (this.#castigo) {

        if (!ultima) {
          this.#castigo = false;
          this.#turnosCastigo = 0;
          return false;
        }
        this.#turnosCastigo -= 1;
        if (this.#turnosCastigo <= 0) {
          this.#castigo = false;
          return false;
        }
        return true;
      }
      return ultima === true;
    }
  }
}