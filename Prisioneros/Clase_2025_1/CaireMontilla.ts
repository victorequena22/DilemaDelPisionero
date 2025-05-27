import { Prisionero } from "../../Prototipos/Prisionero";
// Este prisionero copia la última acción de su cómplice.
// 32467803
export class CaireMontilla extends Prisionero {
    nota = 15;
    constructor() {
        super();
        this.setNombre('Caire Montilla');
    }

    confesar(): boolean {
        const historial = this.getHistorial(this.getComplice().getNombre());

        if (historial.length === 0) {
            return false;
        }

        return historial[historial.length - 1];
    }
}
