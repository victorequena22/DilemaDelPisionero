import { Prisionero } from "../../Prototipos/Prisionero";
//Nunca confies en el.
export class Indeciso extends Prisionero {
    constructor() {
        super();
        this.setNombre('Indeciso')
    }
    confesar() { 
        return Math.round(Math.random()) === 1;
    }
}