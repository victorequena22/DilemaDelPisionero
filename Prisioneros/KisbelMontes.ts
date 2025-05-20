import { Prisionero } from "../Prototipos/Prisionero";
// Prisionero oportunista de rachas: Coopera la primera vez.
// Si el cómplice ha cooperado 3 veces seguidas, traiciona para aprovechar la
// confianza. Si el cómplice ha traicionado 2 veces seguidas, coopera para
// romper la racha. En cualquier otro caso, copia la última jugada del cómplice.
// CI: 31371373
export class KisbelMontes extends Prisionero {
    constructor() {
        super();
        this.setNombre("Kisbel Montes");
    }

    confesar(): boolean {
        const complice = this.getComplice();
        if (!complice) return false;
        const historial = this.getHistorial(complice.getNombre());
        if (historial.length === 0) {
            return false; // Coopera la primera vez
        }
        // Si el cómplice ha cooperado 3 veces seguidas
        if (historial.length >= 3 && !historial[historial.length-1] && !historial[historial.length-2] && !historial[historial.length-3]) {
            return true;
        }
        // Si el cómplice ha traicionado 2 veces seguidas
        if (historial.length >= 2 && historial[historial.length-1] && historial[historial.length-2]) {
            return false;
        }
        // En cualquier otro caso, copia la última jugada
        return historial[historial.length-1];
    }
}
