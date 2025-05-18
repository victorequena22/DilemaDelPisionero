import { Prisionero } from "../../Prototipos/Prisionero";
//Este nunca te Traisionara
export class Confiable extends Prisionero {
    constructor(){
        super();
        this.setNombre('Confiable')
    }
    confesar() { return false; }
}