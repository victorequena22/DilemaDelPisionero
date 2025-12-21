import { Prisionero } from "../../Prototipos/Prisionero";
//Este te traisiona hasta que te ganes su confianza
export class Redentor extends Prisionero {
    constructor() {
        super();
        this.nombre = 'Redentor';
    }
    confesar() {
        return !this.historial.includes(false);
    }
}