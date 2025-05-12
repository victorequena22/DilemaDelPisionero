import { Prisionero } from "../Prototipos/Prisionero";
//Este te traisiona hasta que te ganes su confianza
export class Redentor extends Prisionero {
    constructor() {
        super();
        this.setNombre('Redentor')
    }
    confesar() {
        const historial = this.getHistorial(this.getComplice().getNombre());
        return !historial.includes(false);
    }
}