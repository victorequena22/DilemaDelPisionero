import { Prisionero } from "../Prototipos/Prisionero";

export class OrleandysMora extends Prisionero {
    nota = 14;
    // no sigue las reglas de la guia
    // no explica logica de la estrategia
    #ultimaJugadaPropia: boolean = false; // false = NEGAR
    #cedulaIdentidad: string = "32.106.617";

    constructor() {
        super();
        this.nombre = "Orleandys Mora";
    }

    public override confesar(): boolean {
        const h = this.historial;
        const oponente = this.complice.nombre.toLowerCase();

        // 1. SINCRONIZACIÓN CON LA ALIANZA
        const equipo = ["fabiola", "valeria", "elienny", "eylin", "cristian"];
        if (equipo.some(e => oponente.includes(e))) return false;

        // 2. LÓGICA PAVLOV (Win-Stay, Lose-Shift)
        if (h.length === 0) {
            this.#ultimaJugadaPropia = false;
            return false;
        }

        const ultimaDelRival = h[h.length - 1];

        // Regla Pavlov: Si hicimos lo mismo, cooperamos. Si no, cambiamos.
        if (this.#ultimaJugadaPropia === ultimaDelRival) {
            this.#ultimaJugadaPropia = false; // Stay (Cooperar)
        } else {
            this.#ultimaJugadaPropia = true;  // Shift (Traicionar)
        }

        return this.#ultimaJugadaPropia;
    }
}