import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

// Wladimir José Rivas Delgado
// CI: V-32.455.156

// EXPLICACIÓN DE LA ESTRATEGIA:
// * Estrategia: Cooperador Inicial con Perdón y Rencor Gradual
// * - Primera ronda: coopera (false).
// * - Si el rival coopera en la última ronda, coopera.
// * - Si el rival traiciona en la última ronda:
// *    - Si es la primera traición recibida, perdona y coopera.
// *    - Si ya ha recibido más de una traición, traiciona.
// * - Si el rival ha traicionado 3 o más veces en total, activa bandera de venganza y traiciona siempre.
// * Fundamentos: Busca fomentar la cooperación mutua, pero se defiende ante traiciones repetidas.
/**
    Estrategia: 0puntos la descripcion de la estrategia no concuerda con lo que hace el codigo
    Codigo:     8puntos el codigo es correcto pero no refleja la estrategia descrita
 */

export class WladimirRivas extends Prisionero {
    nota = 8;
    constructor() {
        super();
        this.nombre = 'Wladimir Rivas';
    }

    confesar(_i: Interrogador): boolean {
        const historial = this.historial; // historial del cómplice

        // Primera ronda: coopera
        if (historial.length === 0) {
            return false;
        }

        // Rondas siguientes: imita la última acción del cómplice
        const ultimaAccionComplice = historial[historial.length - 1];
        return ultimaAccionComplice;
    }
}