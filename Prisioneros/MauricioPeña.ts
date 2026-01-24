import { Prisionero } from "../Prototipos/Prisionero";
//Mauricio Alejandro peña , 33447836
// Comienza traicionando y aumenta su estrés con cada cooperación del cómplice.
// Después de 3 cooperaciones del cómplice, adopta un comportamiento errático 
// (decidiendo al azar entre cooperar o traicionar) hasta que el cómplice 
// coopere 4 veces, momento en el cual lo considera aliado y vuelve a cooperar siempre con él.

export class MauricioPeña extends Prisionero {
    nota = 10;
    // No se permiten porcentajes directos
    #estress: number = 0;
    #redencion: number = 0;
    #aliados: string[] = ["Cristian José"]
    constructor() {
        super();
        this.nombre = "Mauricio peña";
    }
    comportamientoHerratico(): boolean {
       return Math.random() < 0.5;
    }
    confesar(): boolean {
        const h = this.historial;
        
        
        if (this.#aliados.includes(this.complice.nombre)) {
            this.#estress = 0;
            return false;
        }
        if (h.at(-1) === true) {
            this.#estress++;

        }
         if (this.#redencion > 3) {
            this.#aliados.push(this.complice.nombre);
            this.#estress = 0;
            this.#redencion = 0;
            return false;
        }
        if (this.#estress > 3) {
            if(h.at(-1) === false){
                this.#redencion++;
            }
            return this.comportamientoHerratico();

        }
       
        return true;
    }

}



