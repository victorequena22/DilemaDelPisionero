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
    Estrategia: 8puntos no concuerda del todo con la logica implementada
    Codigo:     4puntos hay un error de logica
    Reglas:    -7puntos
 */
export class FabrizioMorales extends Prisionero {
    nota = 5;
    /* Reglas de la clase para variables -2 */
    turnosJugadosTotales: number;
    /* Reglas de la clase para variables -4 */
    totalTraicionesOponente: number;
    /* Reglas de la clase para variables -6 */
    totalCooperacionesOponente: number;

    constructor() {
        super();
        this.nombre = 'Fabrizio Morales';
        this.turnosJugadosTotales = 0;
        this.totalTraicionesOponente = 0;
        this.totalCooperacionesOponente = 0;
    }

    confesar(): boolean {
        this.turnosJugadosTotales++;
    /* Reglas de la clase para variables -7 */
        const historialOponente = this.historial;

        if (historialOponente.length === 0) {
            return false;
        }

        this.totalTraicionesOponente = 0;
        this.totalCooperacionesOponente = 0;
        /** Aqui hay un error en la logica */
        for (let i = 0; i < historialOponente.length; i++) {
            if (historialOponente[i] === true) {
                this.totalTraicionesOponente++;
            } else {
                this.totalCooperacionesOponente++;
            }
        }

        if (this.totalTraicionesOponente > this.totalCooperacionesOponente) {
            return true;
        } else {
            return false;
        }
    }
}
