import { Interrogador } from "../Prototipos/Interrogador";
import { Prisionero } from "../Prototipos/Prisionero";
/*Mauricio Alejandro peña
C.I:33447836*/
/* este prisionero siempre traiciona al prisionero 
Cristian sierralta, ademas durante las primeras 3 interacciones contra un prisionero,
este coopera para conseguir informacion y a la siguiente interacción traiciona, después sigue cooperando. 
Despues si su sentencial actual es mayor al resultar de las rondas jugadas*3
traiciona, sino coopera*/
export class MauricioPeña extends Prisionero {
    
    constructor() {
        super()
        this.nombre = "Mauricio peña"
    }
    //estructura bandera
    traicionD(): boolean {
        var nombre_complice = this.complice.nombre;
        if (nombre_complice === "Cristian sierralta") {
            return true;
        } else {
            return false;
        }
    }

    confesar(interrogador: Interrogador): boolean {
        if (this.traicionD()) {
            return true;
        }
        if (this.historial.length <= 3) {
            return false;
        }
        if(this.historial.length == 4) {
            return true;
        }
        if (this.sentencia > (interrogador.Historial1.length * 3)) {
            return true;
        }
        return false;
    }
}