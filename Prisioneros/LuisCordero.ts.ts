import { Prisionero } from "../Prototipos/Prisionero";

//Este prisionero tiene ciertas reglas para cooperar
// en la primera ronda siempre coopera
// apartir de la segunda ronda ve el historial del Complice y coopera Si y Solo Si 
// el Complice Coopero y el numero de la ronda es Par y Si el Complice traiciona 
// y el numero de la ronda es impar
// en los demas casos Traicionara

// Luis Cordero C.I:30.803.750

export class LuisCordero extends Prisionero {
  constructor() {
    super();
    this.setNombre('Luis Cordero');
  }

  confesar(): boolean {
    const nombreComplice = this.getComplice().getNombre();
    const historialComplice = this.getHistorial(nombreComplice) || [];
    const rondaActual = historialComplice.length + 1;

    // Condición especial para la primera ronda
    if (rondaActual === 1) {
      return true; // En la primera ronda, Luis siempre COOPERA
    }

    // A partir de la segunda ronda, evaluamos el historial
    const hayHistorial = historialComplice.length > 0; // Esto siempre será true si rondaActual > 1
    const compliceCooperoUltimaRonda = hayHistorial && historialComplice[historialComplice.length - 1] === false; // false = cooperar
    const compliceTraicionoUltimaRonda = hayHistorial && historialComplice[historialComplice.length - 1] === true; // true = traicionar

    // Condición 1 para COOPERAR (a partir de la ronda 2): Cómplice cooperó última ronda Y ronda actual es par
    const condicionCoopera1 = compliceCooperoUltimaRonda && rondaActual % 2 === 0;

    // Condición 2 para COOPERAR (a partir de la ronda 2): Cómplice traicionó última ronda Y ronda actual es impar
    const condicionCoopera2 = compliceTraicionoUltimaRonda && rondaActual % 2 !== 0;

    // Si se cumple alguna de las condiciones para cooperar, Luis coopera
    if (condicionCoopera1 || condicionCoopera2) {
      return true; // Luis COOPERA (no confiesa)
    } else {
      return false; // Luis TRAICIONA (confiesa)
    }
  }
}