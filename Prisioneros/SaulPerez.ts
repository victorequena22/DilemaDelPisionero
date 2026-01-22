import { Prisionero } from '../Prototipos/Prisionero';

/**
 * Nombre: Saul Perez
 * C.I: V-14.031.695
 * Se eliminan los límites de perdón fijos. Ahora el perdón
 * se recarga si el oponente demuestra 5 rondas de cooperación consecutivas.
 * Uso explícito de Acumuladores de traición, 
 * Contadores de paz y Banderas de estado (modoVenganza).
 * El algoritmo permite la redención mutua,
 * evitando caer en un bucle de castigo eterno que dañe la sentencia final.
 */

export class Saulperez extends Prisionero {

    nota = 15;
    // No sigue las reglas de las guias


    private traicionesRecibidas: number = 0;   // Acumulador
    private pazConsecutiva: number = 0;        // Contador
    private modoVenganza: boolean = false;     // Bandera

    constructor() {
        super();
        this.nombre = "Saul Perez";
    }

    public confesar(): boolean {
        const historial = this.historial;
        const n = historial.length;

        // Cooperación inicial para establecer confianza
        if (n === 0) return false;

        // Actualiza (Basado en el historial del cómplice)
        const ultimaAccion = historial[n - 1];
        if (ultimaAccion === true) {
            this.traicionesRecibidas++;
            this.pazConsecutiva = 0;
        } else {
            this.pazConsecutiva++;
        }

        // Si el oponente acumula 3 traiciones, activamos el castigo.
        if (this.traicionesRecibidas >= 3) {
            this.modoVenganza = true;
        }

        // Si el oponente coopera 5 veces seguidas, recuperamos la confianza.

        if (this.pazConsecutiva >= 5) {
            this.modoVenganza = false;
            this.traicionesRecibidas = 0;
        }

        // Decisiones
        if (this.modoVenganza) {
            return true; // Confesar (Castigar)
        }

        return false; // Negar (Cooperar)
    }
}
