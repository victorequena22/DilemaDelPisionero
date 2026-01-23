import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Cristian José sierralta Gallardo
// Cedula: 32014233
/// Comienza cooperando y mantiene una alta paciencia 
// al ignorar traiciones aisladas, activando su modo de castigo 
// (traición sistemática) únicamente tras acumular 5 ofensas del oponente; 
// sin embargo, no es rencoroso de por vida, ya que permite la redención total 
// y el reinicio de su confianza si el cómplice demuestra 
// arrepentimiento cooperando 5 veces consecutivas bajo su castigo.
export class CristianJose extends Prisionero {
    nota = 15;
    // No sigue las reglas de la guia
    // no explica bien la estrategia
    #afinidad: number = 0;
    #observadorfalse: number = 0;
    #aliados: string[] = ["Mauricio peña"];
    constructor() {
        super();
        this.nombre = "Cristian José";
    }
    
   confesar() {
        const h = this.historial;


        if(this.#aliados.includes(this.complice.nombre)){
            return false; 
        }

        if (h.length === 0) return false; 

   
        if (h.at(-1) === true) {
            this.#afinidad++;
        }

      
        if (this.#afinidad > 4) {
      
            if (h.at(-1) === false) {
                this.#observadorfalse++;
            }

            
            if (this.#observadorfalse > 4) {
                this.#afinidad = 0;
                this.#observadorfalse = 0;
                return false; 
            }

            return true; 
        }

        return false;
    }
}