import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Moises Gimenez
// Cedula: 30978985
// Estrategia: "Espejo Atenuado con Sonda Inicial" (Pavloviana Adaptativa).
// Comienza cooperando (falso) en la primera ronda para sondear al cómplice.
// En las siguientes rondas evalúa el historial específico de ese cómplice:
// Si en la ronda anterior ambos hicieron lo mismo (cooperar-cooperar o confesar-confesar),
// se asume un estado de equilibrio o beneficio mutuo y el prisionero decide COOPERAR (falso) para incentivar la paz.
// Si el cómplice traiciona consecutivamente rompiendo el pacto, se activa una bandera de venganza (bloqueo)
// donde se confiesa (verdadero) sistemáticamente. Condición de desbloqueo: Que el cómplice coopere 2 veces seguidas.
/** te lo gano Wladimir Rivas */
export class MoisesGimenez extends Prisionero {
    /* Reglas de la clase para variables -1 */
    #traicionesConsecutivas: Record<string, number> = {};
    /* Reglas de la clase para variables -2 */
    #banderaVenganza: Record<string, boolean> = {};
    /* Reglas de la clase para variables -3 */
    #totalRondasPorComplice: Record<string, number> = {};
    /* Reglas de la clase para variables -4 */
    #acumuladorTraiciones: Record<string, number> = {};

    constructor() {
        super();
        this.nombre = 'Moises Gimenez';
    }

    confesar(): boolean {
        if (!this.complice || !this.complice.nombre) {
            return false;
        }

        const rival = this.complice.nombre;
        if (this.#totalRondasPorComplice[rival] === undefined) {
            this.#totalRondasPorComplice[rival] = 0;
            this.#traicionesConsecutivas[rival] = 0;
            this.#banderaVenganza[rival] = false;
            this.#acumuladorTraiciones[rival] = 0;
        }

        this.#totalRondasPorComplice[rival]++;

        // RONDA 1: Sonda Inicial
        if (this.#totalRondasPorComplice[rival] === 1) {
            return false;
        }

        const historialSeguro = this.historial as Record<string, boolean[]>;
        const historialRival: boolean[] = historialSeguro[rival] || [];

        if (historialRival.length === 0) {
            return false;
        }

        const ultimaAccionRival = historialRival[historialRival.length - 1];

        if (ultimaAccionRival === true) {
            this.#traicionesConsecutivas[rival]++;
            this.#acumuladorTraiciones[rival]++;
        } else {
            this.#traicionesConsecutivas[rival] = 0;
        }

        // CONDICIÓN DE BLOQUEO
        if (this.#traicionesConsecutivas[rival] >= 3) {
            this.#banderaVenganza[rival] = true;
        }

        //CONDICIÓN DE DESBLOQUEO
        if (this.#banderaVenganza[rival] === true) {
            const len = historialRival.length;

            if (len >= 2 && historialRival[len - 1] === false && historialRival[len - 2] === false) {
                this.#banderaVenganza[rival] = false;
                this.#traicionesConsecutivas[rival] = 0;
            } else {
                return true;
            }
        }

        if (ultimaAccionRival === true) {
            return true;
        }

        return false;
    }
}
