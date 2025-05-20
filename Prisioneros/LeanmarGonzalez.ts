import { Prisionero } from "../Prototipos/Prisionero";

// Este prisionero comienza cooperando, pero si es traicionado 3 veces seguidas, 
//    se vuelve vengativo para siempre LeanmarGonzalez 
// 31885162
export default class LeanmarGonzalez extends Prisionero {
    private volverseVengativo: boolean = false;
    
    constructor() {
        super();
        this.setNombre('Leanmar Gonzalez');
    }
    
    confesar(): boolean {
        if (this.volverseVengativo) {
            return true;
        }
        
        const historial = this.getHistorial(this.getComplice().getNombre());
        const ultimasTres = historial.slice(-3);
        
      
        if (ultimasTres.length === 3 && ultimasTres.every(decision => decision)) {
            this.volverseVengativo = true;
            return true;
        }
        
        return false;
    }
 } 