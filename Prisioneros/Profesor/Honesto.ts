import { Prisionero } from "../../Prototipos/Prisionero";
//Nunca confies en el.
export class Honesto extends Prisionero {
    constructor() {
        super();
        this.nombre = 'Honesto';
    }
    confesar() { return true; }
}