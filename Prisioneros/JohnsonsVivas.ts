import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

// Nombre: Johnsons Vivas 
// Cedula: 27.759.369
// Estrategia:  Si el complice supera las 20 líneas de código, siempre traicionamos.
// Si son menores a 20 lineas, cooperamos hasta que el nos traicione.
/** Rompe el juego */

export class JohnsonsVivas extends Prisionero {

    private bandera: boolean = false;

    constructor() {
        super();
        this.nombre = 'Johnsons Vivas';
    }

    confesar(i: Interrogador): boolean { 
        // Si el oponente tiene más de 20 líneas, activamos la bandera para traicionar.
        if (i.contarLineas(i.nombre_del_complice) > 20) {
            this.bandera = true;
        }
        // Activación de bandera.
        if (this.bandera) {
            return true;
        }
        // Si el complice tiene menos de 20 lineas de código, cooperamos, pero si nos traiciona una vez, dejamos de cooperar.
        if (this.historial.length > 0 && this.historial[this.historial.length - 1] === true) {
            // activamos la bandera para traicionar.
            this.bandera = true;
            return true;
        }


        return false;
    }
}