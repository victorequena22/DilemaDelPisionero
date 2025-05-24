
import { Prisionero } from "../Prototipos/Prisionero";
//es un prisionero estratégico, adaptable y cíclico, que toma decisiones basadas en:
//Su número de ronda actual.
//El historial de decisiones de su cómplice.
//Andres Alvarado 31.737.593

export class AndresAlavarado extends Prisionero {
    private ronda: number = 0;
    
    /*******************************************************************/
    /** se te olvido poner privado el atributo ronda                   */
    /*******************************************************************/
    nota = 14;

    constructor() {
        super();
        this.setNombre("Andres Alavarado");
    }

    confesar(): boolean {
        // Aumenta el número de ronda cada vez que se toma una decisión
        this.ronda++;

        // Obtiene al cómplice y su historial de decisiones pasadas
        const complice = this.getComplice();
        const historial = this.getHistorial(complice.getNombre());

        // Determina si alguna vez fue traicionado (true en el historial)
        const fueTraicionado = historial.includes(true);

        //  Cada 15 rondas, imita lo que hizo el cómplice en la ronda anterior
        if (this.ronda % 15 === 0) {
            const ultimaDecision = historial[historial.length - 1] ?? false;
            return ultimaDecision; // true = traiciona, false = coopera
        }

        //  Si fue traicionado alguna vez y está en una ronda múltiplo de 10, traiciona
        if (fueTraicionado && this.ronda % 10 === 0) {
            return true;
        }

        //  Si nunca fue traicionado y está en una ronda múltiplo de 8, traiciona por prevención
        if (!fueTraicionado && this.ronda % 8 === 0) {
            return true;
        }

        //  Si no se cumple ninguna condición, coopera
        return false;
    }
}






