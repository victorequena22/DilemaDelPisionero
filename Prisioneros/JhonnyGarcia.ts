import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

//Jhonny García Ing Telematica
//CI 31877527

//El prisionero funciona de la siguiente manera:
//Con la estructura bandera coopera siempre con el prisionero llamado Gabriel Rivero
//En la primera ronda siempre coopera
//En la segunda ronda siempre coopera
//Analiza las últimas 2 traiciones consecutivas del cómplice
//Solo traiciona si el cómplice traicionó 2 veces seguidas
//En cualquier otro caso, coopera
/** 
    Estrategia: 10puntos
    codigo:     10puntos
    reglas:    -2puntos
 */
export class JhonnyGarcia extends Prisionero {
    nota = 18;
    constructor() {
        super();
        this.nombre = 'Jhonny García';
    }
    override confesar(_: Interrogador): boolean {
        const historial = this.historial;

        if (this.complice.nombre === 'Gabriel Rivero') {
            return false;
        }

        if (historial.length < 2) {
            return false;
        }

        /* Reglas de la clase para variables -1 */
        const ultimasDos = historial.slice(-2);
        /* Reglas de la clase para variables -2 */
        const dostraiciones = ultimasDos.every((r) => r === true);

        if (dostraiciones) {
            return true;
        }

        return false;
    }
}
