import { Prisionero } from "../Prototipos/Prisionero";

/*
NOMBRE DEL PRISIONERO: FelixPerez 
CEDULA: 3O266225
ESTRATEGIA: MULTIPLES personalidades 
segun la personalidad si se siente pacifico no traiciona, si se siente belico traiciona
y si se siente imitador imita la ultima jugada del otro prisionero
*/

export class FelixPerez extends Prisionero {
  nota = 0;
  // exactamente igual a JesusFreitez
  #personalidad: string[];
  #lista_aliados: string[];


  constructor() {
    super();
    this.nombre = "FelixPerez";
    this.#personalidad = ["pacifico", "belico", "imitador", "aleatorio"];
    this.#lista_aliados = ["Mariel Granadillo", "Anmary Gallardo", " "];
  }

  confesar() {
    let indic_personalidad = Math.floor((Math.random() * 3) + 1);
    let personalidad_actual = this.#personalidad[indic_personalidad];

    if (this.#lista_aliados.includes(this.complice.nombre)) {
      console.log("el pricionero " + this.nombre + " ha decidido no traicionar a su aliado");
      return false;
    }

    switch (personalidad_actual) {
      case "pacifico":

        return false;
      case "belico":

        return true;
      case "imitador":

        let historial_complice = this.historial;
        if (historial_complice[historial_complice.length - 1]) {

          return true;
        } else {

          return false;
        }
      default:
        return !!Math.round(Math.random());
    }
  }
}