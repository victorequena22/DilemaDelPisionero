import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Gabriel Rivero
// Cedula: 31.631.523
// Estrategia: Empieza cooperando (negando).
// Mantiene una lista de aliados donde solo está Jhonny Garcia para cooperar con él.
// Contra los demás, verifica si fue traicionado en la ronda anterior mediante el historial;
// si es así, activa la bandera de bloqueo para confesar en la ronda actual y luego se desbloquea.
/**
    Esa Estrategia ya la implemento WladimirRivas
 */
export class GabrielRivero extends Prisionero {
    /* Reglas de la clase para variables -1 */
    cantidad_traiciones_rival: number;
    /* Reglas de la clase para variables -2 */
    esta_bloqueado_por_venganza: boolean;
    /* Reglas de la clase para variables -3 */
    lista_aliados: string[];

    constructor() {
        super();
        this.nombre = 'Gabriel Rivero';
        this.cantidad_traiciones_rival = 0;
        this.esta_bloqueado_por_venganza = false;
        /** No tengo complices con ese nombre */
        this.lista_aliados = ['Jhonny Garcia'];
    }

    confesar(): boolean {
        var nombre_rival = this.complice.nombre;
        var decision_final;

        if (this.lista_aliados.includes(nombre_rival)) {
            decision_final = false;
        } else {
            /* Reglas de la clase para variables -4 */
            var historialRival: boolean[] = this.historial;

            if (historialRival && historialRival.length > 0) {
                /* Reglas de la clase para variables -5 */
                var ultimaJugadaRival = historialRival[historialRival.length - 1];

                if (ultimaJugadaRival === true) {
                    this.esta_bloqueado_por_venganza = true;
                } else {
                    this.esta_bloqueado_por_venganza = false;
                }
            }

            if (this.esta_bloqueado_por_venganza) {
                decision_final = true;
            } else {
                decision_final = false;
            }
        }

        return decision_final;
    }
}
