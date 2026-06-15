import { Prisionero } from "../Prototipos/Prisionero";
//Nombre y Apellido: María  Andreina González
//Cedula: 19846211
//EL PRISIONERO VENGADOR.
// Estrategia Analitica. Negar y cooperar.
// Mi prisionero niega sus crimenes. Pero analiza el comportamiento previo al oponente. 
//  Que a pesar de su comportamiento, ha demostrado ser una persona astuta y manipuladora. 
// Su historia es un recordatorio de que no siempre se puede juzgar a alguien por su apariencia o edad. 
// En la cárcel, ha tenido problemas con otros prisioneros debido a su actitud desafiante y 
// su tendencia a meterse en problemas. 
// Sin embargo, también ha mostrado momentos de vulnerabilidad y arrepentimiento, 
// lo que hace que su caso sea aún más complejo, y ha generado debates sobre su verdadera naturaleza y 
// las razones detrás de sus acciones. Por otro lado, sabe que su oponente dira la verdad porque siempre
//  se ha mostrado debil y vulnerable, lo que hace que su oponente sea un blanco fácil para sus manipulaciones. 

/** Esto rompe el juego por favor revisa los pricioneros de tus companeros s */

export class MariaGonzalez extends Prisionero {
    #MariaGonzalez: string;
    #cedula: number;
    #confesionesRival: number; 

    constructor() {
        super("MariaGonzalez", 19846211); ///?????????????????
        this.#MariaGonzalez = "MariaGonzalez";
        this.#cedula = 19846211;
        this.#confesionesRival = 0;
    }    
 
    tomarDecision(oponente: string | null): string {
        if (oponente === null) {
            return "NEGAR"; 
        }
        
        if (oponente === "CONFESAR") {
            this.#confesionesRival++;
        } else {
            this.#confesionesRival = 0; 
        }

        if (this.#confesionesRival >= 2) { 
            return "CONFESAR"; 
        }

        return "NEGAR";
    }

    NegarCrimenes() { return true; }
}