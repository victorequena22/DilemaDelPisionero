import { Prisionero } from '../Prototipos/Prisionero';

// Daniel Melendez CI 31234021
// Coopera en la primera ronda.
// Luego: si el resultado anterior fue SIMÉTRICO (ambos cooperaron o ambos traicionaron),
// repite tu jugada anterior. Si fue ASIMÉTRICO, cambia tu jugada.
/**
    Estrategia: 10puntos
    Codigo:     10puntos
    Bonos:      2puntos
    Reglas:    -4puntos
 */
export class DanielMelendez extends Prisionero {
    nota = 18;
    /* Reglas de la clase para variables -2 */
    private misDecisiones: boolean[] = [];

    constructor() {
        super();
        this.nombre = 'Daniel Melendez';
    }

    confesar(): boolean {
        const historial = this.historial;
        const n = historial.length;

        if (n === 0) {
            const decision = false;
            this.misDecisiones.push(decision);
            return decision;
        }

        /* Reglas de la clase para variables -3 */
        const yoTraicione = this.misDecisiones[n - 1];
        /* Reglas de la clase para variables -4 */
        const rivalTraiciono = historial[n - 1];

        var decision: boolean;

        if (yoTraicione === rivalTraiciono) {
            decision = yoTraicione;
        } else {
            decision = !yoTraicione;
        }

        this.misDecisiones.push(decision);
        return decision;
    }
}
