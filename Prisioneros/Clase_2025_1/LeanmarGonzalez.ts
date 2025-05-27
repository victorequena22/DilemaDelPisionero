import { Prisionero } from "../../Prototipos/Prisionero";
import { InterrogadorInterface, PrisioneroInterface } from "../../Prototipos/interface";

// Analiza secuencias de movimientos para anticipar el siguiente movimiento del cómplice.
// LeanmarGonzalez 31885162 

export class LeanmarGonzalez extends Prisionero {
    /***************************************************************/
    /** se te olvido poner privados los metodos y atributos        */
    /***************************************************************/
    nota = 13;
    private patrones: Map<string, string[]>;
    private profundidadAnalisis: number;

    constructor() {
        super();
        this.setNombre("LeanmarGonzalez");
        this.patrones = new Map();
        this.profundidadAnalisis = 4; // Analiza secuencias de hasta 4 movimientos
    }

    confesar(): boolean {
        const complice = this.getComplice();
        const nombreComplice = complice.getNombre();
        const historialComplice = this.getHistorial(nombreComplice);

        // Si es la primera interacción, cooperar
        if (historialComplice.length === 0) {
            return false;
        }

        // Convertir historial a cadena de símbolos
        const historialSimbolos = this.convertirASimbolos(historialComplice);

        // Actualizar patrones conocidos
        this.actualizarPatrones(historialSimbolos, nombreComplice);

        // Predecir siguiente movimiento del cómplice
        const prediccion = this.predecirMovimiento(historialSimbolos, nombreComplice);

        // Tomar decisión basada en la predicción
        return this.tomarDecisionEstrategica(prediccion, historialComplice);
    }

    private convertirASimbolos(historial: boolean[]): string {
        return historial.map(a => a ? 'T' : 'C').join('');
    }

    private actualizarPatrones(historial: string, nombreComplice: string): void {
        if (!this.patrones.has(nombreComplice)) {
            this.patrones.set(nombreComplice, []);
        }

        const patronesComplice = this.patrones.get(nombreComplice)!;

        // Analizar patrones de diferentes longitudes
        for (let len = 2; len <= this.profundidadAnalisis; len++) {
            if (historial.length >= len) {
                const patron = historial.slice(-len);
                if (!patronesComplice.includes(patron)) {
                    patronesComplice.push(patron);
                }
            }
        }
    }

    private predecirMovimiento(historial: string, nombreComplice: string): string | null {
        const patronesComplice = this.patrones.get(nombreComplice)!;
        if (patronesComplice.length === 0) return null;

        // Buscar el patrón más largo que coincida con el final del historial
        for (let len = Math.min(this.profundidadAnalisis, historial.length); len >= 1; len--) {
            const ultimoPatron = historial.slice(-len);

            // Buscar todas las ocurrencias de este patrón en el historial
            const ocurrencias: string[] = [];
            for (let i = 0; i <= historial.length - len - 1; i++) {
                if (historial.slice(i, i + len) === ultimoPatron) {
                    ocurrencias.push(historial[i + len]);
                }
            }

            // Si encontramos ocurrencias, predecir el movimiento más frecuente después de este patrón
            if (ocurrencias.length > 0) {
                const cuenta: Record<string, number> = { 'C': 0, 'T': 0 };
                ocurrencias.forEach(mov => cuenta[mov]++);
                return cuenta['C'] >= cuenta['T'] ? 'C' : 'T';
            }
        }

        return null;
    }

    private tomarDecisionEstrategica(prediccion: string | null, historial: boolean[]): boolean {
        // Si no podemos predecir, usar estrategia conservadora
        if (prediccion === null) {
            return historial.length % 3 === 0; // Traiciona cada 3 rondas si no hay patrón claro
        }

        // Si predice cooperación, traicionar para aprovechar
        if (prediccion === 'C') {
            return true;
        }

        // Si predice traición, cooperar para minimizar daño
        return false;
    }
}

