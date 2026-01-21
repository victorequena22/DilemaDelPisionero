import { Interrogador } from "../Prototipos/Interrogador";
import { Prisionero } from "../Prototipos/Prisionero";
/*Jose Gonzalez
C.I:31986923*/
/* este prisionero siempre traiciona al prisionero de diego bustamente y 
Juan Cortez, ademas durantes las primeras 5 interacciones contra un prisionero,
este coopera para conseguir informacion y 
despues si su sentencial actual es mayor al resultar de las rondas jugas*5 
traiciona, sino coopera*/
export class JoseGonzalez extends Prisionero {
    nota = 20;
    constructor() {
        super()
        this.nombre = "Jose Gonzalez"
    }
    //estructura bandera
    traicionD(): boolean {
        var nombre_complice = this.complice.nombre;
        if (nombre_complice === "Diego Bustamante" || nombre_complice === "Juan Cortez") {
            return true;
        } else {
            return false;
        }
    }

    confesar(interrogador: Interrogador): boolean {
        if (this.traicionD()) {
            return true;
        }
        if (this.historial.length < 5) {
            return false;
        }
        if (this.sentencia > (interrogador.Historial1.length * 5)) {
            return true;
        }
        return false;
    }
}


