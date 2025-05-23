import { PrisioneroInterface } from "../Prototipos/interface";
import { Prisionero } from "../Prototipos/Prisionero";

//De acuerdo al planteamiento del dilema original de Prisionero. Este prisionero actuara en función a evitar
//el beneficio común con respecto a su complice, por lo tanto evaluará cúal fué la ultima relación que tuvo con él
// en su historial y en las proximas rondas se comportará de manera contraria a él para así evitar un comportamiento coincidente.

//Angel Rodriguez 31.596.746


export class AngelRodriguez extends Prisionero{
    constructor(){
        super();
        this.setNombre("Angel Rodriguez");
        
    }
    confesar(): boolean {
        var complice: PrisioneroInterface= this.getComplice();
         var historial=this.getHistorial(complice.getNombre());

        if(historial.length != 0){
          var respuesta: boolean= !(historial[length -1])
           return respuesta
        }

        return true;
    
    }
}