import { Prisionero } from "../Prototipos/Prisionero";

/*este prsionero va tomando la deciciones de si confezar o no comparando la cantidad de veces que a sido traicionado y cunatas veces no a  traicionado*/
//CI:33.091.874
export class JesusFernandez extends Prisionero {
    private traiciones: number; 
    private noTraiciones: number; 

    constructor() {
        super();
        this.setNombre('Jesus Fernandez');
        this.traiciones = 0;
        this.noTraiciones = 0;
    }

    confesar() {
        const complice = this.getComplice();
        if (!complice) return false; 

        const nombre = complice.getNombre();
        const historial = this.getHistorial(this.getComplice().getNombre())

        
        if (historial[nombre] === undefined) {
            historial[nombre] = [];
            return false; 
        } else {
        
            const ultimaAccion = historial[nombre][historial[nombre].length - 1];

           
            if (ultimaAccion) {
                this.traiciones++;
            } else {
                this.noTraiciones++;
            }

            
            if (this.traiciones > this.noTraiciones) {
                return false; 
            } else if (this.traiciones < this.noTraiciones) {
                return true; 
            } else {
               
                return ultimaAccion; 
            }
        }
        
    }
}
