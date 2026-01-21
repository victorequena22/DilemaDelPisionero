import { Prisionero } from "../Prototipos/Prisionero";
/*
Alumno : Arais Mendez
Cedula : 30123456
Estrategia del prisionero:
El prisionero revisa si su complice esta en la lista de aliados, si esta en la lista no traiciona.
En caso de que no este en la lista, el prisionero cuenta las colaboraciones y las traiciones de su complice.
Si las colaboraciones son mayores que las traiciones, el prisionero colabora.
Si las traiciones son mayores que la colaboraciones, el prisionero traiciona.
Si ninguna de las dos de cumple, el prisionero evalua la ultima accion del complice y actua en base a esa accion. Si lo traicionaron, traiciona. Si no lo traicionaron, no traiciona.
*/
export class AraisMendes extends Prisionero {
  nota = 20;
  #aliados: String[];

  constructor() {
    super();
    this.nombre = "Arais Mendes";
    // variable bandera
    this.#aliados = ["Jesus Freitez", "Gabriel Nosequevaina", "Leopoldo Lopez"];
  }
  confesar() {
    let nombre_complice = this.complice.nombre;
    let historial_complice = this.historial;

    if (this.#aliados.includes(nombre_complice)) {
      return false;
    }

    // variables contadoras
    let colaboraciones = historial_complice.filter(
      (traicion: boolean) => !traicion
    ).length;
    let traiciones = historial_complice.filter(
      (traicion: boolean) => traicion
    ).length;

    if (colaboraciones > traiciones) {
      return false;
    }
    if (traiciones > colaboraciones) {
      return true;
    }

    if (historial_complice[historial_complice.length - 1]) {
      return true;
    }
    return false;
  }
}
