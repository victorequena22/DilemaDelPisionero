import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

// Nombre: Gabriel Guillen
// Cédula: 32925874
// Estrategia: Mayoría con bandera de alerta + factor de impredecibilidad
// - Primera ronda: coopera.
// - A partir de la segunda ronda: analiza la tendencia general de traiciones vs cooperaciones.
// - Si el rival traiciona dos veces seguidas, activa una bandera de peligro y defiende confesando.
// - Si la tendencia vuelve a ser cooperativa, desactiva la bandera.
// - FACTOR IMPREDECIBLE: 10% de aleatoriedad + patrón según número de ronda
// - EVENTO RARO: Convencer al interrogador (0.5% + condiciones específicas)
/** No se permiten porcentages directos */
export class Gabriel_Guillen extends Prisionero {
    nota: number = 20;
    
    // [BANDERA]: Estado de alerta que se activa ante agresiones consecutivas
    private banderaPeligro: boolean = false;

    constructor() {
        super();
        this.nombre = 'Gabriel Guillen';
    }

    confesar(_i: Interrogador): boolean {
        const historial: boolean[] = this.historial;

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

        // Decisión base: si la bandera está activa confiesa, si no, se guía por la mayoría
        let decision: boolean = this.banderaPeligro ? true : traiciones > cooperaciones;

        // FACTOR IMPREDECIBLE: 10% de aleatoriedad + patrón según número de ronda
        // EVENTO RARO: Convencer al interrogador (0.5% + condiciones específicas)
        const ronda: number = historial.length;
        const aleatorio: number = Math.random();
        
        // EVENTO RARO: Convencer al interrogador (0.5% + condiciones específicas)
        if (ronda > 10 && cooperaciones > traiciones * 2 && aleatorio < 0.005) {
            // El prisionero logra poner al interrogador de su lado y escapar juntos
            return false; // Cooperación extrema para sellar la alianza
        }
        
        // 10% de invertir decisión aleatoriamente
        if (aleatorio < 0.1) {
            decision = !decision;
        }
        // Patrón: cada 5 rondas invertir si la ronda es impar
        else if (ronda % 5 === 0 && ronda % 2 !== 0) {
            decision = !decision;
        }

        return decision;
    }
}
