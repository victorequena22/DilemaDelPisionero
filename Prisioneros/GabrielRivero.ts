import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Gabriel Rivero
// Cedula: 31.631.523
// Estrategia: Empieza cooperando (negando).
// Mantiene una lista de aliados donde solo está Jhonny Garcia para cooperar incondicionalmente.
// Contra los demás, usa un contador acumulativo de traiciones. Si el rival acumula más de 2
// traiciones en total, se activa un bloqueo de venganza severo por 2 rondas seguidas,
// tras las cuales se le otorga una condición de desbloqueo si el rival decide volver a cooperar.
/**
    Estrategia: 5puntos Se parece demaciado a la de Felix Perez 
    Quita la condicion de perdon que Felix Perez tiene
    Codigo:     5puntos el codigo en su mayria esta bien pero 
    Bonos:      3puntos
    Reglas:    -5puntos
 */
export class GabrielRivero extends Prisionero {
    nota = 7;
    /* Reglas de la clase para variables -1 */
    cantidad_traiciones_rival: number;
    /* Reglas de la clase para variables -2 */
    esta_bloqueado_por_venganza: boolean;
    /* Reglas de la clase para variables -3 */
    lista_aliados: string[];
    /* Reglas de la clase para variables -4 */
    rondas_castigo_restantes: number;

    constructor() {
        super();
        this.nombre = 'Gabriel Rivero';
        this.cantidad_traiciones_rival = 0;
        this.esta_bloqueado_por_venganza = false;
        this.lista_aliados = ['Jhonny Garcia'];
        this.rondas_castigo_restantes = 0;
    }

    confesar(): boolean {
        var nombre_rival = this.complice.nombre;
        var decision_final;

        if (this.lista_aliados.includes(nombre_rival)) {
            decision_final = false;
        } else {
            /* Reglas de la clase para variables -5 */
            var historialRival: boolean[] = this.historial;

            if (historialRival && historialRival.length > 0) {
                var ultimaJugadaRival = historialRival[historialRival.length - 1];

                if (ultimaJugadaRival === true) {
                    this.cantidad_traiciones_rival++;
                }
                /** El error esta aqui si el tiene 0 rondas_castigo_restantes vas se rompe la estrategia mas no da error el codigo */
                if (this.rondas_castigo_restantes > 0) {
                    this.rondas_castigo_restantes--;
                    if (this.rondas_castigo_restantes === 0 && ultimaJugadaRival === false) {
                        this.esta_bloqueado_por_venganza = false;
                    }
                } else if (this.cantidad_traiciones_rival > 2) {
                    this.esta_bloqueado_por_venganza = true;
                    this.rondas_castigo_restantes = 2;
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
