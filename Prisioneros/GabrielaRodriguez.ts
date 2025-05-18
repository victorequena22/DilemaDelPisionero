import { Prisionero } from "../Prototipos/Prisionero";

//coopera la primera vez. Luego, analiza las dos últimas jugadas del cómplice
//si ambas fueron traiciones, ella confiesa; si al menos una fue cooperación, ella coopera.
// V31925657

export class GabrielaRodriguez extends Prisionero {
    private traicion_perdonada: Record<string, boolean> = {};
    private rompió_confianza: Record<string, boolean> = {};

    constructor() {
        super();
        this.setNombre("Gabriela Rodríguez");
    }

    confesar(): boolean {
        const complice = this.getComplice();
        if (!complice) return true;

        const nombre = complice.getNombre();
        const historial = this.getHistorial(nombre);

        if (this.rompió_confianza[nombre]) {
            return true;
        }

        for (const traicion of historial) {
            if (traicion) {
                if (this.traicion_perdonada[nombre]) {
                    this.rompió_confianza[nombre] = true;
                    return true;
                } else {
                    this.traicion_perdonada[nombre] = true;
                }
            }
        }

        return false;
    }
}
