import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Kelvin Pacheco
// Cedula: 31843546
// Estrategia: El prisionero inicia cooperando. Pero evalua y cuenta constantemente qué tan seguido lo traicionan, comparando las traiciones con el total de rondas usando una escala fija de 10 a 4.
//Si las traiciones superan esa comparación, activa la Bandera de alerta y confiesa.
// Pero si el complice coopera 2 veces seguidas, bajamos la bandera de peligro.
/**
    La estrategia esta bien pero en las reglas del juego se especifica que
    No se pueden usar porcentajes directos cambia esa parte por otra forma de calcularlo
    y tendra 20puntos
    Estrategia: 10puntos
    Codigo:     10puntos
    Bonos:      2puntos
    Reglas:    -4puntos
 */
export class KelvinPacheco extends Prisionero {
    nota = 18;
    // [ACUMULADOR]: Registra el total de traiciones sufridas por cada cómplice
    /* Reglas de la clase para variables -1 */
    private traiciones_por_complice: Record<string, number> = {};

    // [CONTADOR]: Registra la cantidad total de rondas jugadas contra cada cómplice
    /* Reglas de la clase para variables -2 */
    private rondas_por_complice: Record<string, number> = {};

    // [CONTADOR]: Cuenta las cooperaciones consecutivas del rival para la condición de desbloqueo
    /* Reglas de la clase para variables -3 */
    private cooperaciones_seguidas: Record<string, number> = {};

    // [BANDERA]: Estado de alerta individual para saber si debemos castigar al cómplice actual
    /* Reglas de la clase para variables -4 */
    private bandera_peligro: Record<string, boolean> = {};

    constructor() {
        super();

        this.nombre = 'Kelvin Pacheco';
    }

    override confesar(): boolean {
        const rival = this.complice.nombre;

        // Inicialización en la primera ronda con este cómplice específico

        if (this.rondas_por_complice[rival] === undefined) {
            this.rondas_por_complice[rival] = 0;

            this.traiciones_por_complice[rival] = 0;

            this.cooperaciones_seguidas[rival] = 0;

            this.bandera_peligro[rival] = false;

            return false; // Inicia cooperando (niega el crimen)
        }

        const historial_rival = this.historial;

        if (historial_rival.length > 0) {
            const ultima_jugada_rival = historial_rival[historial_rival.length - 1];

            // Uso de Contadores y Acumuladores exigidos

            this.rondas_por_complice[rival]++;

            if (ultima_jugada_rival === true) {
                this.traiciones_por_complice[rival] += 1; // Acumulador de traiciones

                this.cooperaciones_seguidas[rival] = 0; // Rompe racha de cooperaciones
            } else {
                this.cooperaciones_seguidas[rival]++; // Contador de cooperaciones seguidas
            }

            // Evaluación Matemática de escala de 10 a 4 para activar la BANDERA de peligro.

            const traiciones_actuales = this.traiciones_por_complice[rival];
            const rondas_actuales = this.rondas_por_complice[rival];

            if (traiciones_actuales * 10 > rondas_actuales * 4) {
                this.bandera_peligro[rival] = true;
            }

            // CONDICIÓN DE DESBLOQUEO: Si coopera 2 veces seguidas, bajamos la bandera de peligro

            if (this.cooperaciones_seguidas[rival] >= 2 && this.bandera_peligro[rival] === true) {
                this.bandera_peligro[rival] = false;

                this.traiciones_por_complice[rival] = 0; // Reseteo parcial del acumulador
            }
        }

        // Si la bandera está en true confiesa (true), de lo contrario coopera (false)

        return this.bandera_peligro[rival];
    }
}
