import { Prisionero } from "../../Prototipos/Prisionero";
//Nunca confies en el.
export class Indeciso extends Prisionero {
    constructor() {
        super();
        this.nombre = 'Indeciso';
    }
    confesar() { 
        return Math.round(Math.random()) === 1;
    }
}