import { Prisionero } from '../Prototipos/Prisionero';
// Nombre: Johnsons Vivas
// Cedula: 27.759.369
// Estrategia: El prisionero comienza Cooperando inicialmente, pero traiciona permanentemente al detectar una traicion.
/** Este ya esta entre los del profesor */
export class JohnsonsVivas extends Prisionero {
    /* Reglas de la clase para variables -1 */
    private bandera: boolean = false;

    constructor() {
        super();
        this.nombre = 'Johnsons Vivas';
    }

    confesar(): boolean {
        const historial = this.historial;

        // Si la bandera ya está activada, traiciona siempre
        if (this.bandera) {
            return true;
        }

        // Si el cómplice traicionó en la última ronda, activa la bandera y traiciona
        if (historial.length > 0 && historial[historial.length - 1] === true) {
            this.bandera = true;
            return true;
        }

        // Por defecto, coopera
        return false;
    }
}
