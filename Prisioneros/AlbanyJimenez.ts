import { Prisionero } from "../Prototipos/Prisionero";

// albany valentina jimenez lopez ci 32023496
// traiciona si el nombre del prisionero empieza por D, M o V
// si no, traiciona si el otro lo hizo antes y de lo contrario coopera

export class AlbanyJimenez extends Prisionero {
    nota = 20;
    constructor() {
        super();
        this.nombre = 'Albany Jimenez';
    }

    confesar(): boolean {
        const nombre_del_complice = this.complice.nombre.toUpperCase();
        const historial = this.historial;

        // bandera
        if (nombre_del_complice.startsWith('D') ||
            nombre_del_complice.startsWith('V') ||
            nombre_del_complice.startsWith('M')) {
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

