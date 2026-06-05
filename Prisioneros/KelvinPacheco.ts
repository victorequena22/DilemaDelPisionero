import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Kelvin Pacheco

// Cedula: 31843546

// Estrategia: El prisionero Inicia cooperando. Y cuenta las traiciones recibidas.

// Si las traiciones superan el 40% del total de rondas, activa una bandera de alerta y confiesa.

// Cuenta con una condición de desbloqueo si el rival coopera dos veces seguidas.
/**
    La estrategia esta bien pero en las reglas del juego se especifica que
    No se pueden usar porcentajes directos cambia esa parte por otra forma de calcularlo
    y tendra 20puntos
    Estrategia: 0puntos
    Codigo:     0puntos
    Bonos:      2puntos
    Reglas:    -10puntos
 */
export class KelvinPacheco extends Prisionero {
    nota = -8;
    // [ACUMULADOR]: Registra el total de traiciones sufridas por cada cómplice
    /* Reglas de la clase para variables -2 */
    private traicionesPorComplice: Record<string, number> = {};

    // [CONTADOR]: Registra la cantidad total de rondas jugadas contra cada cómplice
    /* Reglas de la clase para variables -4 */
    private rondasPorComplice: Record<string, number> = {};

    // [CONTADOR]: Cuenta las cooperaciones consecutivas del rival para la condición de desbloqueo
    /* Reglas de la clase para variables -6 */
    private cooperacionesSeguidas: Record<string, number> = {};

    // [BANDERA]: Estado de alerta individual para saber si debemos castigar al cómplice actual
    /* Reglas de la clase para variables -8 */
    private banderaPeligro: Record<string, boolean> = {};

    constructor() {
        super();

        this.nombre = 'Kelvin Pacheco';
    }

    override confesar(): boolean {
        const rival = this.complice.nombre;

        // Inicialización en la primera ronda con este cómplice específico

        if (this.rondasPorComplice[rival] === undefined) {
            this.rondasPorComplice[rival] = 0;

            this.traicionesPorComplice[rival] = 0;

            this.cooperacionesSeguidas[rival] = 0;

            this.banderaPeligro[rival] = false;

            return false; // Inicia cooperando (niega el crimen)
        }
        /* Reglas de la clase para variables -9 */
        const historialRival = this.historial;

        if (historialRival.length > 0) {
            /* Reglas de la clase para variables -10 */

            const ultimaJugadaRival = historialRival[historialRival.length - 1];

            // Uso de Contadores y Acumuladores exigidos

            this.rondasPorComplice[rival]++;

            if (ultimaJugadaRival === true) {
                this.traicionesPorComplice[rival] += 1; // Acumulador de traiciones

                this.cooperacionesSeguidas[rival] = 0; // Rompe racha de cooperaciones
            } else {
                this.cooperacionesSeguidas[rival]++; // Contador de cooperaciones seguidas
            }

            // Evaluación para activar la BANDERA de peligro (Tasa superior al 40%)

            const tasaTraicion = this.traicionesPorComplice[rival] / this.rondasPorComplice[rival];
            /** No se permiten porcentages directos */
            if (tasaTraicion > 0.4) {
                this.banderaPeligro[rival] = true;
            }

            // CONDICIÓN DE DESBLOQUEO: Si coopera 2 veces seguidas, bajamos la bandera de peligro

            if (this.cooperacionesSeguidas[rival] >= 2 && this.banderaPeligro[rival] === true) {
                this.banderaPeligro[rival] = false;

                this.traicionesPorComplice[rival] = 0; // Reseteo parcial del acumulador
            }
        }

        // Si la bandera está en true confiesa (true), de lo contrario coopera (false)

        return this.banderaPeligro[rival];
    }
}
