import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Moises Gimenez
// Cedula: 30978985
// Estrategia: "Filtro de Tendencia Mayoritaria" (Híbrida Adaptativa)
/** Rompe el juego */
export class MoisesGimenez extends Prisionero {
    
    #rondas_totales: Record<string, number> = {};

    constructor() {
        super();
        this.nombre = 'Moises Gimenez';
    }

    confesar(): boolean {
        if (!this.complice?.nombre) return false;
        const rival = this.complice.nombre;


        this.#rondas_totales[rival] = (this.#rondas_totales[rival] || 0) + 1;

        
        const historial_rival = (this.historial as Record<string, boolean[]>)[rival] || [];
        if (historial_rival.length === 0) return false;

        
        const total_traiciones = historial_rival.filter(accion => accion === true).length;

      
        if (total_traiciones > historial_rival.length / 2) {
            return true;
        }
        
        return historial_rival[historial_rival.length - 1];
    }
}