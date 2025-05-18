import { Prisionero } from "../Prototipos/Prisionero";
//Este prisionero traiciona solamente si su complice contiene en su nombre la letra "a",
//de lo contrario solo cooperará
// Gabriel Mora 32.623.667
export class GabrielMora extends Prisionero {
    constructor() {
        super();
        this.setNombre('Gabriel Mora');
    }
    confesar() {
        const compliceCheck = this.getComplice().getNombre();
        const filtroComplice = compliceCheck.search("a")
        if (filtroComplice !== -1) {
            return false;
        } else {
            return true;
        }
    }
}