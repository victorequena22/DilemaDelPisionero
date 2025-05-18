import { Prisionero } from "../Prototipos/Prisionero";
//Este prisionero no confieza mientras que su complice no lo traicione
//mas de dos vezes, si su complice lo traiciona mas de dos vezes el lo traicionara siempre.
// Alaina Medina 31027740

export class AlainaMedina extends Prisionero {
    constructor(){
        super();
        this.setNombre('Alaina Medina')
    }
    confesar() : boolean { 
        const nombreComplice = this.getComplice().getNombre();
        const historial = this.getHistorial(nombreComplice) || [];
        const vecesTraicionado = historial.filter(respuesta => respuesta === true).length;
        if(vecesTraicionado >=2 ){
            return true
        }
        else {
            return false 
        }
    }
}
