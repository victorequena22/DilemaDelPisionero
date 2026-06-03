import { Prisionero } from '../Prototipos/Prisionero';

// Felix Daniel Perez CI 30266225
// Estrategia: coopera por defecto.
// Si el complice lo traiciono 2 veces seguidas, activa una bandera y traiciona.
// Se desactiva si el complice coopera en la siguiente ronda.
/**
    Estrategia: 10puntos
    Codigo:     10puntos
    Bonos:      3puntos
    Reglas:     -3puntos
 */
/** felixperez.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1 */
export class FelixPerez extends Prisionero {
    nota = 20;
    /* Reglas de la clase para variables -2 */
    private bandera: boolean = false;
    /* Reglas de la clase para variables -3 */
    private contador: number = 0;

    constructor() {
        super();
        this.nombre = 'Felix Daniel Perez';
    }

    confesar(): boolean {
        const historial = this.historial;
        const n = historial.length;

        if (n > 0 && historial[n - 1] === true) {
            this.contador++;
        } else {
            this.contador = 0;
            this.bandera = false;
        }

        if (this.contador >= 2) {
            this.bandera = true;
        }

        return this.bandera;
    }
}
