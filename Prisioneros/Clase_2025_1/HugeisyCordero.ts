import { Prisionero } from "../../Prototipos/Prisionero";

// Primera jugada: Decisión aleatoria 
// Si el cómplice traiciona: Responde con traición 
// Si el cómplice coopera: Mantiene su última decisión
// Si el cómplice coopera dos veces seguidas: Perdona la traición
// Hugeisy Cordero 29754399

export class HugeisyCordero extends Prisionero {
    /*******************************************************************/
    /** se te olvido poner privado el metodo decisionAleatoria        */
    /*******************************************************************/
    nota = 14;
    #estadoPorComplice: {
        [nombre: string]: {
            perdonando: boolean,
            ultimaDecision: boolean,
            cooperacionesSeguidas: number
        }
    } = {};

    constructor() {
        super();
        this.setNombre('Hugeisy Cordero');
    }

    private decisionAleatoria(): boolean {
        return [true, false][Math.floor(Math.random() * 2)];
    }

    confesar(): boolean {
        const nombreComplice = this.getComplice().getNombre();
        const historial = this.getHistorial(nombreComplice) || [];
        
        if (!this.#estadoPorComplice[nombreComplice]) {
            this.#estadoPorComplice[nombreComplice] = {
                perdonando: false,
                ultimaDecision: this.decisionAleatoria(),
                cooperacionesSeguidas: 0
            };
        }

        const estado = this.#estadoPorComplice[nombreComplice];

        if (historial.length === 0) return estado.ultimaDecision;

        const compliceTraiciono = historial[historial.length - 1];

        if (compliceTraiciono) {
            estado.ultimaDecision = true;
            estado.perdonando = false;
            estado.cooperacionesSeguidas = 0;
            return true;
        }

        estado.cooperacionesSeguidas++;
        if (estado.cooperacionesSeguidas >= 2) estado.perdonando = true;

        return estado.perdonando ? false : estado.ultimaDecision;
    }
}