import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

// Nombre: Gabriel Guillen
// Cédula: 32925874
// Estrategia: Mayoría con bandera de alerta
// - Primera ronda: coopera.
// - A partir de la segunda ronda: analiza la tendencia general de traiciones vs cooperaciones.
// - Si el rival traiciona dos veces seguidas, activa una bandera de peligro y defiende confesando.
// - Si la tendencia vuelve a ser cooperativa, desactiva la bandera.
/** Ya implemento jonny Garcia */
export class Gabriel_Guillen extends Prisionero {
    nota: number = 20;
    
    // [BANDERA]: Estado de alerta que se activa ante agresiones consecutivas
        /* Reglas de la clase para variables -2 */
    private banderaPeligro: boolean = false;

    constructor() {
        super();
        this.nombre = 'Gabriel Guillen';
    }

    confesar(_i: Interrogador): boolean {
        const historial: boolean[] = this.historial; // historial de acciones del rival

        // Primera ronda: cooperar
        if (historial.length === 0) {
            return false;
        }

        // Rondas siguientes: calcular la tendencia global del rival
        const traiciones: number = historial.filter((accion: boolean) => accion === true).length;
        const cooperaciones: number = historial.length - traiciones;

        // Verificación para activar la BANDERA de peligro (dos traiciones seguidas)
        if (historial.length >= 2) {
            const ultima: boolean = historial[historial.length - 1];
            const penultima: boolean = historial[historial.length - 2];
            
            if (ultima === true && penultima === true) {
                this.banderaPeligro = true;
            }
        }

        // Condición de desbloqueo de la bandera: si la tendencia global vuelve a ser cooperativa
        if (this.banderaPeligro && cooperaciones > traiciones) {
            this.banderaPeligro = false;
        }

        // Decisión final: si la bandera está activa confiesa, si no, se guía por la mayoría
        if (this.banderaPeligro) {
            return true;
        }

        return traiciones > cooperaciones;
    }
}