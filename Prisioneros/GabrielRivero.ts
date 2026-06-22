import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

// Nombre: Gabriel David Rivero Gonzalez
// Cedula: 31.631.523
// Estrategia: 
// En la primera ronda siempre traiciona
// Traiciona siempre con un cómplice de confianza (Jhonny Garcia)
// Lleva conteo de cooperaciones TOTALES del cómplice en el historial
// Si el cómplice ha cooperado 2 o más veces en total → coopera
// En cualquier otro caso, traiciona
/**
    Estrategia: 10puntos 
    Codigo:     10puntos 
    Bonos:      3puntos
    Reglas:    -1puntos
 */
export class GabrielRivero extends Prisionero {
    nota=20;
    constructor() {
        super();
        this.nombre = 'Gabriel Rivero';
    }

    override confesar(_: Interrogador): boolean {
        const historial = this.historial;

        if (this.complice.nombre === 'Jhonny Garcia') {
            return true;
        }

        if (historial.length < 1) {
            return true;
        }
    /* Reglas de la clase para variables -7 */
        const totalCooperaciones = historial.filter((r) => r === false).length;

        if (totalCooperaciones >= 2) {
            return false;
        }

        return true;
    }
}