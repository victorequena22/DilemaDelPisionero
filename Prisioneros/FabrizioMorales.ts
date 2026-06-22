import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Fabrizio Morales
// Cédula: 32.602.404
// Estrategia: Reputacion.
// - En el primer turno, cooperamos (false).
// - En los turnos siguientes, evaluamos el historial completo del oponente.
// - Si el oponente tiene más traiciones (true) que cooperaciones (false), lo traicionamos (true).
// - Si tiene más cooperaciones o hay un empate, cooperamos (false).
// - Condición de perdón: Si el oponente vuelve a cooperar y sus cooperaciones igualan o superan las traiciones, volvemos a cooperar.

/**
    Estrategia: 6puntos La estrategia se decribe como local cuando es global
    Codigo:     9puntos hay un error de logica
    Reglas:    -1puntos
 */
export class FabrizioMorales extends Prisionero {
    nota = 15;
    #turnos_jugados_totales: number;
    #total_traiciones_oponente: number;
    #total_cooperaciones_oponente: number;

    constructor() {
        super();
        this.nombre = 'Fabrizio Morales';
        this.#turnos_jugados_totales = 0;
        this.#total_traiciones_oponente = 0;
        this.#total_cooperaciones_oponente = 0;
    }

    confesar(): boolean {
        this.#turnos_jugados_totales++;
        /* Reglas de la clase para variables -1 */
        const historialOponente = this.historial;

        if (historialOponente.length === 0) {
            return false;
        }

        this.#total_traiciones_oponente = 0;
        this.#total_cooperaciones_oponente = 0;

        for (let i = 0; i < historialOponente.length; i++) {
            if (historialOponente[i] === true) {
                this.#total_traiciones_oponente++;
            } else {
                this.#total_cooperaciones_oponente++;
            }
        }

        if (this.#total_traiciones_oponente > this.#total_cooperaciones_oponente) {
            return true;
        } else {
            return false;
        }
    }
}
