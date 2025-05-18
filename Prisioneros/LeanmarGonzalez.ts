import { Prisionero } from "../Prototipos/Prisionero";

// Este jugador analiza el historial y responde con base en la mayoría
// Lenmar Gonzalez 31885162
export class LeanmarGonzalez extends Prisionero {
    constructor() {
        super();
        this.setNombre('Leanmar Gonzalez'); // Corrección aquí
    }

    confesar(): boolean {
        const historial = this.getHistorial(this.getComplice().getNombre());

        const traiciones = historial.filter(valor => valor === true).length;
        const colaboraciones = historial.filter(valor => valor === false).length;

        return traiciones > colaboraciones;
    }
}