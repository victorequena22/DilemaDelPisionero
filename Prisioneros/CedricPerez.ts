//Nombre: Cedric Jose Perez Rodriguez
//Cedula: 32.602.404

import { Prisionero } from '../Prototipos/Prisionero';
/**
    Que significa nos fue bien?
    no se explica la condicion de cambio de accion
    estrategia: 5puntos
    codigo:     6puntos
    bonos:      2puntos
    Reglas:    -4puntos
 */
// En la primera ronda copero.
// si me fue bien repito mi accion.
// si no cambio la accion.
export class CedricPerez extends Prisionero {
    nota = 9;
    /* No se utiliza en la estrategia */
    #puntos_de_confianza: number = 10;

    constructor() {
        super();
        this.nombre = 'CedricPerez';
    }

    public override confesar(): boolean {
        var h = this.historial;
        /* Reglas de la clase para variables -1 */
        var hC = this.complice.historial;
        /* No tengo aliados con esos nombres */
        var aliados = ['JesusMoises', 'HiramVazquez'];
        var nombre_oponente = this.complice.nombre.toLowerCase();
        /* Reglas de la clase para variables -2 */
        var miUltimaAccion = h[h.length - 1];
        /* Reglas de la clase para variables -3 */
        var suUltimaAccion = hC[hC.length - 1];
        /* Reglas de la clase para variables -4 */
        var nosFueBien = suUltimaAccion === false;

        if (aliados.some((a) => a.toLowerCase() === nombre_oponente)) {
            return false;
        }
        /** la balidacion de primera ronda no cumple su funcion */
        if (h.length === 0 || hC.length === 0) {
            return false;
        }

        if (nosFueBien) {
            return miUltimaAccion;
        } else {
            return !miUltimaAccion;
        }
    }
}
