import { Prisionero } from "../Prototipos/Prisionero";
// Este prisionero copia la última acción de su cómplice.
// 31367742
export class MarielbysRodriguez extends Prisionero {
    constructor() {
        super();
        this.setNombre('Marielbys Rodriguez');
    }

    confesar(interrogador): boolean {
        const historial = interrogador.getHistorial(this.getComplice().getNombre());

        if (historial.length === 0) {
            return false;
        }

        return historial[historial.length - 1];
    }
}