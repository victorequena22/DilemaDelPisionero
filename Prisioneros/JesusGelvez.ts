// ============================================================
// DATOS DEL ALUMNO
// Nombre: Jesus Gelvez
// Cédula: [31.926.221]
// Estrategia: "Renacer tras el Perdón"
// ============================================================
// EXPLICACIÓN DETALLADA DE LA ESTRATEGIA:
//
// Inspirada en "Tit for Tat" (ojo por ojo) pero con dos innovaciones:
//
// 1. PERDÓN CONDICIONAL: Si el oponente ha traicionado (confesado)
//    en más de 5 rondas en total, entonces esta estrategia coopera (niega)
//    en la siguiente ronda como oferta de paz, reiniciando el ciclo.
//
// 2. BLOQUEO TEMPORAL CON DESBLOQUEO: Si el oponente traiciona 3 VECES
//    SEGUIDAS, se activa un "modo castigo" que devuelve 3 traiciones
//    consecutivas. Luego de cumplido el castigo, se desbloquea y vuelve
//    a la normalidad. Esto cumple con la regla de "condición de desbloqueo".
// ============================================================

import { Prisionero } from '../Prototipos/Prisionero';
/** Rompe el juego y no sigue la herencia */
export class JesusGelvez extends Prisionero {
    #consecutiveTraiciones: number;
    #modoBloqueo: boolean;
    #castigosPendientes: number;

    constructor() {
        super();
        this.#consecutiveTraiciones = 0;
        this.#modoBloqueo = false;
        this.#castigosPendientes = 0;
        this.nombre = 'Jesus Gelvez';
    }

    confesar(roundNumber: number, myHistory: boolean[], opponentHistory: boolean[]): boolean {
        if (roundNumber === 0) {
            return false;
        }

        if (this.#modoBloqueo) {
            if (this.#castigosPendientes > 0) {
                this.#castigosPendientes--;
                if (this.#castigosPendientes === 0) {
                    this.#modoBloqueo = false;
                    this.#consecutiveTraiciones = 0;
                }
                return true;
            } else {
                this.#modoBloqueo = false;
            }
        }

        var lastOpponentMove = opponentHistory[opponentHistory.length - 1];
        if (lastOpponentMove === true) {
            this.#consecutiveTraiciones++;
        } else {
            this.#consecutiveTraiciones = 0;
        }

        if (this.#consecutiveTraiciones >= 3 && !this.#modoBloqueo) {
            this.#modoBloqueo = true;
            this.#castigosPendientes = 3;
            this.#consecutiveTraiciones = 0;
            return true;
        }

        var totalTraicionesRival = opponentHistory.filter(function (move) {
            return move === true;
        }).length;
        if (totalTraicionesRival >= 5) {
            return false;
        }

        return lastOpponentMove;
    }
}
