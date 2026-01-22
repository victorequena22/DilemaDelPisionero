import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

/**
 * Nombre: Gabriel Mendoza
 * Cedula: V-27.212.874
 * Estrategia: "Selección Equilibrada". 
 * Explicación: Analiza el comportamiento reciente del oponente (últimas 10 rondas).
 * Si el oponente ha traicionado en 3 o más de esas 10 ocasiones, el prisionero 
 * confiesa para defenderse. Si hay una mayoría de cooperación, el prisionero coopera.
 * Esto permite perdonar cambios de conducta y optimizar el puntaje mutuo.
 */

export class GabrielMendoza extends Prisionero {
    nota = 18;
    // no cumple con las reglas de la guia
    constructor() {
        super();
        this.nombre = 'Gabriel Mendoza';
    }

    confesar(interrogador: Interrogador): boolean {
        const historialCompleto = this.historial;
        const totalRondas = historialCompleto.length;

        // Empezar cooperando
        if (totalRondas === 0) {
            return false;
        }

        // Toma ultimas 10 rondas para reaccionar rápido
        const memoriaReciente = historialCompleto.slice(-10);

        let confesionesOponente = 0;

        for (const accion of memoriaReciente) {
            if (accion === true) {
                confesionesOponente++;
            }
        }

        // Si hay 3 o más traiciones, dejamos de confiar.
        // La Proporcion de 3/10 es más segura que una mayoría absoluta (6/10).
        if (confesionesOponente >= 3) {
            return true; // Confiesa 
        }

        return false; // Cooperar 
    }
}
