import { Prisionero } from '../Prototipos/Prisionero';

// Edward Daniel Camacho CI 31835800
// ESTRATEGIA MODIFICADA: Opción 2 - La Paranoia Inversa (El Espejo Roto)
// Coopera por defecto.
// Si el cómplice COOPERA (false) 2 veces seguidas, se activa la paranoia:
// Julio activa la bandera y lo traiciona (true) en la tercera ronda para descolocar al rival.
// Se desactiva inmediatamente si el cómplice lo traiciona (true).

/**
    Estrategia: 6puntos - La estrategia no esta bien explicada y se entiende como algo local cuando en relidad es algo global.
    Codigo:     9puntos - El código es correcto pero no refleja la estrategia correctamente.
    Ajustar el codigo o la estrategia para que sean coherentes entre si.
    Reglas     -3puntos
 */
/** edwardcamacho.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1 */
export class EdwardCamcho extends Prisionero {
    nota = 12;
    /* Reglas de la clase para variables -2 */
    private bandera: boolean = false;
    /* Reglas de la clase para variables -3 */
    private contador: number = 0;

    constructor() {
        super();
        this.nombre = 'Edward Daniel Camacho';
    }

    confesar(): boolean {
        // En tu simulador original 'this.historial' guarda las jugadas del rival
        const historial = this.historial;
        const n = historial.length;

        // CAMBIO CLAVE: Evaluamos si la última jugada del cómplice fue COOPERAR (false)
        if (n > 0 && historial[n - 1] === false) {
            this.contador++; // El cómplice está siendo "demasiado bueno", el contador sube
        } else {
            // Si el cómplice traiciona (true) o es la primera ronda, nos relajamos
            this.contador = 0;
            this.bandera = false;
        }

        // Si el cómplice ha cooperado 2 veces seguidas...
        if (this.contador >= 2) {
            this.bandera = true; // Se activa la bandera de traición preventiva
        }

        // Retorna 'true' (traicionar) si la bandera está activa, o 'false' (cooperar) si no.
        return this.bandera;
    }
}
