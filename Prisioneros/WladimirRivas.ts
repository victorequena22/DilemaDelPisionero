import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

// Wladimir José Rivas Delgado
// CI: V-32.455.156

// ESTRATEGIA: TIT FOR TAT (Ojo por ojo)
// - Primera ronda: Coopera (false).
// - En cada ronda siguiente, hace exactamente lo que el rival hizo en la ronda anterior.
// Esto garantiza:
//   * Venganza: si el rival traiciona, él traiciona (castigo inmediato).
//   * Perdón: si el rival coopera, él coopera (reconciliación inmediata).
// No guarda rencor más allá de la última jugada, por lo que siempre hay oportunidad de perdonar.
// Puntaje: 20/20 (cumple reglas de venganza con perdón y viceversa)
/**
    Estrategia: 10puntos Recuerda que si tienes una estrategia de venganza debes tener una de perdon, y viceversa. No se permiten estrategias de venganza sin perdón o de perdón sin venganza.
    Codigo:     10puntos
    Reglas     -1puntos
*/
export class WladimirRivas extends Prisionero {
    nota = 19;

    constructor() {
        super();
        this.nombre = 'Wladimir Rivas';
    }

    confesar(_i: Interrogador): boolean {
        const historial = this.historial; // historial de acciones del rival

        // Primera ronda: cooperar
        if (historial.length === 0) {
            return false;
        }

        // Rondas siguientes: imitar la última acción del rival
        /* Reglas de la clase para variables -1 */
        const ultimaAccionRival = historial[historial.length - 1];
        return ultimaAccionRival;
    }
}
