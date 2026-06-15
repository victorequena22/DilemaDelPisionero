import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

// Nombre: Jean Cordero
// Cédula: 32022714
// Estrategia: Tit-for-Tat con perdón condicional
// - Primera ronda: coopera (no confiesa).
// - Rondas siguientes: replica la última acción del rival.
// - Condición de perdón: si el rival traicionó y en la siguiente ronda coopera,
//   se perdona y se coopera también, rompiendo el ciclo de venganza.
// - Esta estrategia fomenta la cooperación mutua pero responde ante traiciones,
//   evitando ciclos infinitos de represalias.
/** Ya lo implemento nohemi pina */
export class Jean_Cordero extends Prisionero {

    // [CONTADOR]: rastrea traiciones consecutivas del rival
    /* Reglas de la clase para variables -2 */
    private traicionesConsecutivas: number = 0;

    constructor() {
        super();
        this.nombre = 'Jean Cordero';
    }

    confesar(_i: Interrogador): boolean {
        const historial: boolean[] = this.historial; // historial de acciones del rival

        // Primera ronda: cooperar
        if (historial.length === 0) {
            return false;
        }

        /* Reglas de la clase para variables -3 */
        const ultimaAccionRival: boolean = historial[historial.length - 1];

        // Si el rival cooperó en la última ronda, cooperar también (y resetear contador)
        if (ultimaAccionRival === false) {
            this.traicionesConsecutivas = 0;
            return false;
        }

        // Si el rival traicionó, incrementar contador
        this.traicionesConsecutivas++;

        // Condición de perdón: si el rival traicionó solo una vez y luego coopera,
        // se perdona y se coopera en la siguiente oportunidad
        if (this.traicionesConsecutivas === 1 && historial.length >= 2) {
            /* Reglas de la clase para variables -4 */
            const penultimaAccion: boolean = historial[historial.length - 2];
            if (penultimaAccion === false) {
                // El rival cooperó antes de traicionar - es una traición aislada
                this.traicionesConsecutivas = 0;
                return false;
            }
        }

        // Si hay traiciones consecutivas, responder con traición
        return true;
    }
}
