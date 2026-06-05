import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Jhonny Garcia
// Cedula: 31.877.527
// Estrategia: Empieza cooperando (negando).
// Mantiene una lista de aliados donde solo está Gabriel Rivero para cooperar con él.
// Contra los demás, usa un contador para registrar traiciones ajenas y una bandera de bloqueo si el oponente confiesa.
/**
    Esa estrategia es valida pero no esta implementada correctamente en el codigo
    la estrategia tampoco esta bien decrita
    El codigo hace que nunca confiese a nadie
    Eso lo combierte en confiable
    bonos:      3puntos
    Reglas:    -3puntos
 */
export class JhonnyGarcia extends Prisionero {
    /* Reglas de la clase para variables -1 */
    cantidad_traiciones_rival: number;
    /* Reglas de la clase para variables -2 */
    esta_bloqueado_por_venganza: boolean;
    /* Reglas de la clase para variables -3 */
    lista_aliados: string[];

    constructor() {
        super();
        this.nombre = 'Jhonny Garcia';
        this.cantidad_traiciones_rival = 0;
        this.esta_bloqueado_por_venganza = false;
        this.lista_aliados = ['Gabriel Rivero'];
    }

    confesar() {
        var decision_final;
        var nombre_rival;

        nombre_rival = this.complice.nombre;

        if (this.lista_aliados.includes(nombre_rival)) {
            decision_final = false;
        } else {
            /** Donde se activa el Bloqueo? */
            /** Como nunca se activa nunca se ejecuta  */
            if (this.esta_bloqueado_por_venganza) {
                decision_final = true;
                this.esta_bloqueado_por_venganza = false;
            } else {
                decision_final = false;
            }
        }

        return decision_final;
    }
}
