// Nombre: Cedric Perez
// Cedula: 32.602.404

import { Prisionero } from "../Prototipos/Prisionero";

// Estrategia: (Win-Stay, Lose-Shift) con lista blanca de aliados.
// - Primera ronda: Cooperar.
// - Si nos fue bien (el cómplice cooperó), repetimos nuestra última acción. En caso contrario (el cómplice traicionó), cambiamos nuestra acción.
// - Si el complice traiciona de forma repetida, se traicionara devuelta.
/**
    recuerda que si una estrategia tiene vengaza gloval, debe tener una condicion de perdon para no caer en el Traidor
    estrategia: 5puntos no se explica la condicion de venganza y no hay estrategia de perdon
    codigo:     5puntos
    bonos:      3puntos
    Reglas:    -1puntos
 */
/** Cedric_Perez.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1  */
export class CedricPerez extends Prisionero {
    nota = 10;
    #puntos_de_castigo: number = 0;

    constructor() {
        super();
        this.nombre = 'CedricPerez';
    }

    override confesar(): boolean {
        const historial_propio = this.historial;
        const historial_complice = this.complice.historial;

        if (historial_propio.length === 0 || historial_complice.length === 0) {
            this.#puntos_de_castigo = 0;
            return false;
        }

        const lista_aliados = ['VladimirRivas', 'HiramVazquez'];
        const nombre_oponente = this.complice.nombre.toLowerCase();

        if (lista_aliados.some((un_aliado) => un_aliado.toLowerCase() === nombre_oponente)) {
            return false;
        }

        const mi_ultima_accion = historial_propio[historial_propio.length - 1];
        const su_ultima_accion = historial_complice[historial_complice.length - 1];

        if (su_ultima_accion === true) {
            this.#puntos_de_castigo = this.#puntos_de_castigo + 1;
        } else {
            this.#puntos_de_castigo = 0;
        }

        if (this.#puntos_de_castigo >= 3) {
            return true;
        }

        const nos_fue_bien = su_ultima_accion === false;

        if (nos_fue_bien) {
            return mi_ultima_accion;
        } else {
            return !mi_ultima_accion;
        }
    }
}