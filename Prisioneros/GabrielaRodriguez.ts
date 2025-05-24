import { Prisionero } from "../Prototipos/Prisionero";

//Esta estrategia analiza las últimas tres acciones del cómplice y clasifica su alma estratégica en cuatro tipos:
//bondad (coopera seguido), egoísmo (traiciona seguido), caos (mezcla impredecible) o miedo (indefinido)
//Según esa clasificación, adapta su respuesta para maximizar su beneficio, rompiendo patrones predecibles.
// V31925657

export class GabrielaRodriguez extends Prisionero {
    nota = 15;
    
    #conocimiento: Record<string, {
        alma: 'bondad' | 'egoismo' | 'caos' | 'miedo',
        memoria: string
    }> = {};

    constructor() {
        super();
        this.setNombre("Gabriela Rodríguez");
    }

    confesar(): boolean {
        const complice = this.getComplice();
        if (!complice) return false;

        const nombre = complice.getNombre();
        const historial = this.getHistorial(nombre);

        if (!this.#conocimiento[nombre]) {
            this.#conocimiento[nombre] = { alma: 'miedo', memoria: '' };
        }

        const saber = this.#conocimiento[nombre];

        if (historial.length) {
            const ultimo = historial[historial.length - 1] ? 'T' : 'C';
            saber.memoria = (saber.memoria + ultimo).slice(-3);
        }

        if (saber.memoria.length === 3) {
            if (saber.memoria === 'CCC') saber.alma = 'bondad';
            else if (saber.memoria === 'TTT') saber.alma = 'egoismo';
            else if (saber.memoria.includes('C') && saber.memoria.includes('T')) saber.alma = 'caos';
        }

        switch (saber.alma) {
            case 'bondad':
                // Traiciona si la última acción fue cooperación
                return saber.memoria.endsWith('C');

            case 'egoismo':
                // Siempre traiciona
                return true;

            case 'caos':
                // Traiciona si la memoria no es toda igual
                return new Set(saber.memoria).size > 1;

            case 'miedo':
                // Coopera al inicio y traiciona solo tras recibir traición
                return saber.memoria.includes('T');

            default:
                return false;
        }
    }
}