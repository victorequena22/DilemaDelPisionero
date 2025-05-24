import { Prisionero } from "../Prototipos/Prisionero";

//reservado
//sigue un ciclo fijo de 3 rondas que determina si coopera o confiesa. La decisión se basa solo en la historia de interacciones 
//con su cómplice, pero sigue una estrategia no reactiva, más bien planeada.
//Primera ronda (coopera), Segunda Ronda (Coopera si el complice tambien coopero la ronda anterior y si el complice traicionó, el confiesa.)
//Tercera ronda (siempre confiesa sin importar que hizo el complice)
//V31926589

export class SantiagoSanchez extends Prisionero {
    /***************************************************************/
    /** Declarate el atributo #estrategia pero no la usaste        */
    /***************************************************************/
    nota = 14;

    #decidir(historial: boolean[]): boolean {

        const ronda = historial.length % 3;

        if (ronda === 0) {
            return false; // coopera
        } else if (ronda === 1) {
            const ultima = historial[historial.length - 1];
            return !ultima; // coopera si el otro cooperó antes
        } else {
            return true; // confiesa
        }
    }

    #estrategia: string;

    constructor() {
        super();
        this.setNombre("Santiago Sanchez");
        this.#estrategia = "reservada"; // ya no se necesita una clase aparte
    }

    confesar(): boolean {
        const historialComplice = this.getHistorial(this.getComplice().getNombre());
        return this.#decidir(historialComplice);
    }
}
