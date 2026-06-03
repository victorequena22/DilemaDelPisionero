import { Prisionero } from "../Prototipos/Prisionero";

// Gabriel Martinez, Cedula: 31663178
// traiciona si el nombre del prisionero empieza por M o F
// si no, traiciona si el otro lo hizo antes y de lo contrario coopera
/**
    Estrategia: 10puntos
    Codigo:     10puntos
 */
export class GabrielMartinez extends Prisionero {
    nota = 20;
    constructor() {
        super();
        this.nombre = 'Gabriel Martinez';
    }

    confesar(): boolean {
        const nombre_del_complice = this.complice.nombre.toUpperCase();
        const historial = this.historial;

        // bandera
        if (nombre_del_complice.startsWith('M') ||
            nombre_del_complice.startsWith('F')) {
            return true;
        }
        
        // si el complice traicionó en la ultima ronda, traiciona
        //si no, coopera
        if (historial.length > 0 && historial[historial.length - 1] === true) {
            return true;
        }
        return false;
    }
}