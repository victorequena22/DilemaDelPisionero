import { Prisionero } from "../../Prototipos/Prisionero";
//Este es de confianza hasta que lo traisonas
export class Vengador extends Prisionero {
    constructor() {
        super();
        this.nombre = 'Vengador';
    }
    confesar() {
        return this.historial.includes(true);
    }
}