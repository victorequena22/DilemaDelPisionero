import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

//Manuel Vegas
//32029262
// Coopera en las primeras rondas

export class ManuelVegas extends Prisionero {
    nota = 0;
    // ValeriaHernandez ya esta usando esta estrategia
    constructor() {
        super();
        this.nombre = "Manuel Vegas";
    }
    override confesar(_: Interrogador): boolean {
        const historial = this.historial;
        if (historial.length <= 1) {
            return false;
        }
        let cambios = 0;
        for (let i = 1; i < historial.length; i++) {
            if (historial[i] !== historial[i - 1]) {
                cambios++;
            }
        }
        return !!Math.round(cambios / (historial.length - 1));
    }
}