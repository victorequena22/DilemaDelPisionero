import { Prisionero } from "../Prototipos/Prisionero";
//Nunca confies en el.
export class Traidor extends Prisionero {
    constructor() {
        super();
        this.setNombre('Traidor')
    }
    confesar() { return true; }
}