import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

//Mauricio Carrasco, Ing Telematica, Seccion 1
//CI 31900871

//El prisionera funciona de la siguiente manera:
//Con la estructura bandera coopera siempre con el prisionero llamado Valeria Hernandez
// En la primera ronda siempre coopera
// Analiza últimos 3 movimientos (o menos si no hay suficientes)
// Si hay 2 o más traiciones recientes, responde con traición
// Si el cómplice ha sido mayormente cooperativo, coopera
// Usando un promedio: Si el cómplice ha traicionado menos del 50% de las veces, el resultado es 0 (Cooperar).
//Si ha traicionado 50% o más, el resultado es 1 (Traicionar).

export class mauricioCarrasco extends Prisionero {
  nota = 20;
  constructor() {
    super();
    this.nombre = "Mauricio Carrasco";
  }
  override confesar(_: Interrogador): boolean {
    const historial = this.historial;
    if (this.complice.nombre === "Valeria Hernandez") {
      return false;
    }

    if (historial.length === 0) {
      return false;
    }

    const recientes = historial.slice(-3);
    const traiciones = recientes.filter(r => r).length;

    if (traiciones >= 2) {
      return true;
    }

    const totalTraiciones = historial.filter(r => r).length;
    const Traicion = totalTraiciones / historial.length;
    return !!Math.round(Traicion);
  }
}



