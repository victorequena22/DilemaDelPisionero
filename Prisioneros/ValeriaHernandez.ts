import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

//Valeria Hernandez, 32029262
// Coopera en las primeras rondas
// Cuenta los cambios de decisión del cómplice
// Si cambia mucho (más del 50% de las veces), lo considera inestable y traiciona

export class ValeriaHernandez extends Prisionero {
  nota = 20;
  constructor() {
    super();
    this.nombre = "Valeria Hernandez";
  }
  override confesar(_: Interrogador): boolean {
    const historial = this.historial;
    if (historial.length <= 1) {
      return false;
    }
    //esto es una bandera "lista blanca"
    if (this.complice.nombre === "Mauricio Carrasco" || this.complice.nombre === "Albany Jimenez") {
      return false;
    }
    let cambios = 0;
    for (let i = 1; i < historial.length; i++) {
      if (historial[i] !== historial[i - 1]) {
        cambios++;
      }
    }
    //esto es un promedio
    return !!Math.round(cambios / (historial.length - 1));
  }
}

