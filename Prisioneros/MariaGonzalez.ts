import { Prisionero } from "../Prototipos/Prisionero";

//Nombre y Apellido: María Andreina González
//Cedula: 19846211
// EL PRISIONERO VENGADOR.
// Estrategia Analitica. Negar y cooperar.
// Mi prisionero niega sus crimenes. Pero analiza el comportamiento previo al oponente. 
// Que a pesar de su comportamiento, ha demostrado ser una persona astuta y manipuladora. 
// Su historia es un recordatorio de que no siempre se puede juzgar a alguien por su apariencia o edad. 
// En la cárcel, ha tenido problemas con otros prisioneros debido a su actitud desafiante y 
// su tendencia a meterse en problemas. 
// Sin embargo, también ha mostrado momentos de vulnerabilidad y arrepentimiento, 
// lo que hace que su caso sea aún más complejo, and ha generado debates sobre su verdadera naturaleza y 
// las razones detrás de sus acciones. Por otro lado, sabe que su oponente dira la verdad porque siempre
// se ha mostrado debil y vulnerable, lo que hace que su oponente sea un blanco fácil para sus manipulaciones. 
// En resumen, el prisionero termina negando por beneficio propio.
/** Rompe el juego */
export class MariaGonzalez extends Prisionero {
    #nombreAlumno: string;
    #cedula: number;


    static #registroRivalActual: string = " ";
    static #traicionesConsecutivas: number = 0;


    static #venganzaActiva: boolean = false;
    static #totalAnosCarcel: number = 0;
    static #totalRondasJugadas: number = 0;
    static #promedioAnosPorRonda: number = 0;

    constructor() {
        /** Esto rompe el juego */
        super("MariaGonzalez", 19846211);
        this.#nombreAlumno = "MariaGonzalez";
        this.#cedula = 19846211;
    }

    tomarDecision(oponente: string | null, historialOponente: string[] = []): string {
        if (oponente === null) {
            return "NEGAR";
        }


        if (MariaGonzalez.#registroRivalActual !== oponente) {
            MariaGonzalez.#registroRivalActual = oponente;
            MariaGonzalez.#traicionesConsecutivas = 0;
            MariaGonzalez.#venganzaActiva = false;
        }


        if (historialOponente.length > 0) {
            const ultimaJugadaRival = historialOponente[historialOponente.length - 1];

            if (ultimaJugadaRival === "CONFESAR") {
                MariaGonzalez.#traicionesConsecutivas++;
                MariaGonzalez.#totalAnosCarcel += 10; //Nos dan 10 años por negar si él confiesa
            } else {
                MariaGonzalez.#traicionesConsecutivas = 0; //Se reinicia si coopera de forma consecutiva
                MariaGonzalez.#totalAnosCarcel += 5;  //Si Ambos negamos vamos 5 años de carcel
            }
        }
        //Total de rondas jugadas y promedio de años por ronda después de cada decisión.
        MariaGonzalez.#totalRondasJugadas++;
        MariaGonzalez.#promedioAnosPorRonda = MariaGonzalez.#totalAnosCarcel / MariaGonzalez.#totalRondasJugadas;


        // Si mi oponente me ha traicionado 2 veces seguidas, me defiendo con venganza, 
        // lo que significa que confesaré para castigarlo por sus traiciones.
        if (MariaGonzalez.#traicionesConsecutivas >= 2) {
            MariaGonzalez.#venganzaActiva = true;
            return "CONFESAR";
        }

        // En Conclusión mi prisionero termina negando por beneficio propio.
        MariaGonzalez.#venganzaActiva = false;
        return "NEGAR";
    }

    public NegarCrimenes(): boolean {
        return true;
    }
}