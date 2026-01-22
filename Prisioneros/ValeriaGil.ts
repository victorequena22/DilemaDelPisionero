import { Prisionero } from "../Prototipos/Prisionero";

export class ValeriaGil extends Prisionero {
    nota = 0;
    // no sigue las reglas de la guia
    // funciona como vengador por lo que no es valido
    // contadorRondas no se usa para la toma de decisiones
    #traicionadoPorExtraño: boolean = false;
    #contadorRondas: number = 0;

    constructor() {
        super();
        this.nombre = "Valeria Gil";
    }

    public override confesar(): boolean {
        this.#contadorRondas++;
        const h = this.historial;
        const nombreOponente = this.complice.nombre.toLowerCase();

        // 1. LEALTAD ABSOLUTA AL EQUIPO
        const equipo = ["eylin", "elienny", "fabiola", "cristian"];
        if (equipo.some(e => nombreOponente.includes(e))) {
            return false; // Nunca traiciona al equipo
        }

        // 2. LÓGICA DE PROTECCIÓN (Sin azar)
        if (h.length === 0) {
            return false; // Inicia cooperando para probar al extraño
        }

        const ultimaJugadaExtraño = h[h.length - 1];

        // Si el extraño la traiciona UNA vez, se activa el modo "Grim" (Rencor)
        if (ultimaJugadaExtraño === true) {
            this.#traicionadoPorExtraño = true;
        }

        return this.#traicionadoPorExtraño; 
    }
}