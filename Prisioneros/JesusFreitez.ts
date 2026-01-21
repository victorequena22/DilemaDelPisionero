import { Prisionero } from "../Prototipos/Prisionero";


export class jesusFreitez extends Prisionero {
  nota = 0;
  // No se permiten porcentajes directos
  #personalidad: string[];
  #lista_aliados: string[];

  /*
  NOMBRE DEL PRISIONERO: Jesus Freitez
  ESTRATEGIA: MULTIPLES personalidades 
  segun la personalidad si se siente pacifico no traiciona, si se siente belico traiciona
  y si se siente imitador imita la ultima jugada del otro prisionero
  */

  constructor() {
    super();
    this.nombre = "Jesus Freitez";
    this.#personalidad = ["pacifico", "belico", "imitador"];
    this.#lista_aliados = ["JullietUzcategui", "Arais mendez", " "];
  }

  confesar() {
    let indic_personalidad = Math.floor(Math.random() * 4);
    let personalidad_actual = this.#personalidad[indic_personalidad];

    if (this.#lista_aliados.includes(this.complice.nombre)) {
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
        return Math.random() < 0.5 ? true : false;
    }
  }
}