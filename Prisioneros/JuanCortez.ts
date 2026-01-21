import { Interrogador } from "../Prototipos/Interrogador";
import { Prisionero } from "../Prototipos/Prisionero";
//Nombre: Juan Diego de Jesus Cortez Flores
//Cedula: 31.271.706
//Estrategia: Rencoroso pero paciente
//Normalmente empezará cooperando, pero si su cómplice lo traiciona varias veces seguidas, empezará a traicionarlo también.
//Sin embargo, si la sentencia del Prisionero se vuelve demasiado alta, empezará a traicionar a su cómplice para intentar reducir su propia sentencia.
//Además, si su cómplice es alguien con quien tiene una alianza previa (por ejemplo, "Gabriel Caceres" o "Jose Gonzales"), el Prisionero siempre cooperará con ellos.
//Por otro lado, si su cómplice es alguien con quien tiene enemistad (por ejemplo, "Jesus Cruz" o "Jose Blanco"), siempre lo traicionará sin importar las circunstancias.

export class JuanCortez extends Prisionero {
    nota = 20;
    #contTraiciones: number = 0;
    #rondaAct: number = 0;
    #limiteTraiciones: number = 3;
    #factorSentencia: number = 4;

    constructor() {
        super();
        this.nombre = "Juan Cortez";
    }
    override confesar(_i: Interrogador): boolean {
        this.#rondaAct++;
        const historialRival = this.historial;

        if (this.#esAliado()) return false; 
        if (this.#esEnemigoDeclarado()) return true;

        if (historialRival.length === 0) return false;

        this.#actualizarMemoria(historialRival);

        return this.#tomarDecision(historialRival);
    }

    #esAliado(): boolean {
        const aliados = ["Gabriel Caceres", "Jose Gonzales"]; 
        return aliados.includes(this.complice.nombre);
    } //bandera identidad 1

    #esEnemigoDeclarado(): boolean {
        const enemigos =["Jesus Cruz","Jose Blanco"];
        return enemigos.includes(this.complice.nombre);
    }//bandera identidad 2

    #actualizarMemoria(historial: boolean[]): void {
        const ultimaJugada = historial[historial.length - 1];
        if (ultimaJugada === true) {
            this.#contTraiciones++;
        } else {
            this.#contTraiciones = Math.max(0, this.#contTraiciones - 1);
        }
    }//bandera gradual 1

    #tomarDecision(historial: boolean[]): boolean {
        if (this.#contTraiciones >= this.#limiteTraiciones) return true;

        if (this.sentencia > (this.#rondaAct * this.#factorSentencia)) return true;

        return historial[historial.length - 1];
    }//bandera pánico 1
}