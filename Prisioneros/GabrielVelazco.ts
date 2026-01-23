import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Gabriel Velazco
// Cédula: 32.310.505
// Estrategia: Cooperación condicional simple
// Explicación:
// - Niego en el primer turno.
// - Copio la última acción del rival: si él confiesa, yo confieso; si él niega, yo niego.
// - Uso un contador para llevar cuántas veces el rival me ha traicionado.
// - Si el rival me traiciona 4 veces, activo una bandera y confieso siempre.

export class GabrielVelazco extends Prisionero {
  nota = 0;
  // No sigue las reglas de las guias 
  // Tienes una variable global validando la accion local lo que lo convierte en honesto durante la primera ronda
  // Saulperez y EylinMedina usa una estrategia distinta a la de ellos para resolver tu problema
  private traiciones: number = 0;
  private desconfianza: boolean = false;

  constructor() {
    super();
    this.nombre = 'Gabriel Velazco';
  }

  confesar(): boolean {
    const historialRival = this.historial; 

    // Primer turno: no confieso
    if (historialRival.length === 0) {
      return false;
    }

    // Si ya no confío, confieso siempre
    if (this.desconfianza) {
      return true;
    }

    // Última acción del rival
    const ultimaAccionRival = historialRival[historialRival.length - 1];

    // Si el rival confesó, aumento contador
    if (ultimaAccionRival === true) {
      this.traiciones++;
    }

    // Si me traicionó 4 veces, activo bandera
    if (this.traiciones >= 4) {
      this.desconfianza = true;
      return true;
    }

    // Copio la acción del rival
    return ultimaAccionRival;
  }
}
