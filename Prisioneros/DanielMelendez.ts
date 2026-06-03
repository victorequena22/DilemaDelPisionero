import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Daniel Melendez
// Cedula: 31.234.021
// Este prisionero es Calculador Avaricioso:
// Si es aliado, no traiciona (coopera).
// Si la codicia es mayor de 80, traiciona (quiere ganar ventaja).
// Si la sospecha es mayor de 50, traiciona (se defiende por si acaso).
// Si el rival cooperó 2 veces seguidas, la sospecha baja y coopera.
// Si fue traicionado en la última ronda, traiciona.
/**
    La estrategia descrita no coresponde con el codigo.
    El codigo rompe el juego
    Se implemento un prohibicion de porcentajes directos
    Estrategia: 0puntos
    Codigo:     0puntos
    Bonos:      2puntos
    Reglas:    -7puntos
 */
export class DanielMelendez extends Prisionero {
    nota = -5;
    /* Reglas de la clase para variables -2 */
    private totalRondas: number;
    /* Reglas de la clase para variables -4 */
    private totalTraicionesRival: number;
    /* Reglas de la clase para variables -6 */
    private promedioTraicionRival: number;

    constructor() {
        super();
        this.nombre = 'Daniel Melendez';

        this.totalRondas = 0;
        this.totalTraicionesRival = 0;
        this.promedioTraicionRival = 0;
    }

    confesar(): boolean {
        /** Rompe el juego */
        const historial = this.historialRival;

        // Primera ronda: no hay datos, así que iniciamos cooperando (false)
        if (!historial || historial.length === 0) {
            return false;
        }

        this.totalRondas = historial.length;
        /* Reglas de la clase para variables -7 */
        const ultimaJugadaRival = historial[historial.length - 1];
        if (ultimaJugadaRival === true) {
            this.totalTraicionesRival++;
        }

        this.promedioTraicionRival = this.totalTraicionesRival / this.totalRondas;
        /** No se permiten porcentajes directos */
        if (this.promedioTraicionRival > 0.4) {
            return true;
        }

        return false;
    }
}
