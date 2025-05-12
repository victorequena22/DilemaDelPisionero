import { Prisionero } from "../Prototipos/Prisionero";
//Este es de confianza hasta que lo traisonas
export class Vengador extends Prisionero {
    constructor() {
        super();
        this.setNombre('Vengador')
    }
    confesar() {
        const historial = this.getHistorial(this.getComplice().getNombre());
        return historial.includes(true);
    }
}