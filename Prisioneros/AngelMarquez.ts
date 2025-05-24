import { Prisionero } from "../Prototipos/Prisionero";

// 31795086
// Este prisionero alterna su estrategia basado en si fue traicionado en la última ronda
// Si en la última interacción el cómplice cooperó, coopera esta ronda
// Si en la última interacción el cómplice traicionó, alterna entre cooperar y traicionar
export class AngelMarquez extends Prisionero {
    private ultimaDecision: boolean = false;
    /*******************************************************************/
    /** se te olvido poner privado el atributo ultimaDecision          */
    /** no esta bien explicado el comportamiento del codigo            */
    /*******************************************************************/
    nota = 13;

    constructor() {
        super();
        this.setNombre('Angel Marquez');
    }

    confesar(): boolean {
        const historial = this.getHistorial(this.getComplice().getNombre());

        if (historial.length === 0) {
            this.ultimaDecision = false;
            return false; // Primera ronda: coopera
        }

        const ultimaAccionComplice = historial[historial.length - 1];

        if (ultimaAccionComplice) { // Si fue traicionado
            this.ultimaDecision = !this.ultimaDecision; // Alterna su decisión
            return this.ultimaDecision;
        } else { // Si cooperaron con él
            this.ultimaDecision = false;
            return false; // Coopera de vuelta
        }
    }
}