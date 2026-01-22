import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

/**
 * Nombre: Jose Blanco
 * Cedula: 20.321.529
 * Explicación: Esta estrategia se basa en la cooperación recíproca (Tit-for-Tat). 
 * Empieza cooperando y luego imita la última jugada del oponente. Para evitar 
 * ser explotado por traidores constantes, incluye un "límite de golpes" de 5 
 * traiciones acumuladas. Si el oponente traiciona más de 5 veces en total, 
 * el prisionero confiesa permanentemente. 
 */
export class JoseBlanco extends Prisionero {
    nota = 15;
    // No cumple con las reglas de la guia
    private readonly MAXIMO_TRAICIONES_PERMITIDAS = 5;

    constructor() {
        super();
        this.nombre = 'Jose Blanco';
    }

    confesar(interrogador: Interrogador): boolean {
        const historialOponente = this.historial;
        const totalRondas = historialOponente.length;

        if (totalRondas === 0) return false;

        let contadorDeTraiciones = 0;
        
        for (const accion of historialOponente) {
            if (accion === true) {
                contadorDeTraiciones++;
            }
        }

        if (contadorDeTraiciones > this.MAXIMO_TRAICIONES_PERMITIDAS) {
            return true;
        }

        return historialOponente[totalRondas - 1];
    }
}
