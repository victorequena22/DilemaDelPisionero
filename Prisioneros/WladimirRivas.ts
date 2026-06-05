import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

// Wladimir José Rivas Delgado
// CI: V-32.455.156

// EXPLICACIÓN DE LA ESTRATEGIA:
// * Estrategia: Cooperador Inicial con Perdón y Rencor Gradual
// * - Primera ronda: coopera (false).
// * - Si el rival coopera en la última ronda, coopera.
// * - Si el rival traiciona en la última ronda:
// *    - Si es la primera traición recibida, perdona y coopera.
// *    - Si ya ha recibido más de una traición, traiciona.
// * - Si el rival ha traicionado 3 o más veces en total, activa bandera de venganza y traiciona siempre. -----3
// * Fundamentos: Busca fomentar la cooperación mutua, pero se defiende ante traiciones repetidas.
// * Puntaje: 20/20
/**
    Estrategia: 5puntos Recuerda que si tienes una estrategia de venganza debes tener una de perdon, y viceversa. No se permiten estrategias de venganza sin perdón o de perdón sin venganza.
    Codigo:     5puntos
    Reglas     -4puntos
*/
export class WladimirRivas extends Prisionero {
    nota = 6;
    /* Reglas de la clase para variables -2 */
    private rencor: boolean = false; // bandera de venganza activa

    constructor() {
        super();
        this.nombre = 'Wladimir Rivas';
    }

    confesar(_i: Interrogador): boolean {
        const historial = this.historial; // acciones del cómplice (true=traición, false=cooperación)

        // Primera ronda: cooperar
        if (historial.length === 0) {
            return false;
        }

        // Si ya está en modo rencor, traiciona siempre
        if (this.rencor) {
            return true;
        }

        // Contar traiciones totales del rival
        /* Reglas de la clase para variables -3 */
        const totalTraiciones = historial.filter((accion) => accion === true).length;
        /* Reglas de la clase para variables -4 */
        const ultimaAccion = historial[historial.length - 1];

        // Si el rival cooperó en la última ronda
        if (ultimaAccion === false) {
            // Aunque coopere ahora, si ya acumuló 3 o más traiciones, activamos rencor
            if (totalTraiciones >= 3) {
                this.rencor = true;
                return true; // a partir de ahora traiciona siempre
            }
            return false; // coopera
        }

        // Última acción fue traición
        // Perdón solo si es la PRIMERA traición recibida en TODO el historial
        if (totalTraiciones === 1) {
            return false; // perdona, coopera
        }

        // Si es la segunda traición (totalTraiciones >= 2 y aún no llega a 3)
        if (totalTraiciones >= 2 && totalTraiciones < 3) {
            return true; // traiciona
        }

        // Si llegó a 3 o más, activamos rencor (aunque ya debería estar cubierto arriba)
        if (totalTraiciones >= 3) {
            this.rencor = true;
            return true;
        }

        return false; // fallback, por si acaso
    }
}
