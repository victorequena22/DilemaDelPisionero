import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Samuel Esteves
// C.I:32.114.968
// 
// Estrategia: Línea Roja de Reciprocidad Dinámica
// El prisionero inicia cooperando. Mantiene reciprocidad condicional emulando el último
// movimiento del oponente. Si el daño acumulado de traiciones llega a 15, activa una
// bandera defensiva para confesar automáticamente. Se desbloquea si el oponente coopera.
/** Rompre el juego */
/** Ya lo implemento Wilian Rivas */

export class SamuelEsteves extends Prisionero {
        /* Reglas de la clase para variables -2 */
    private flagAlertaDefensiva: boolean;       
        /* Reglas de la clase para variables -4 */
    private contadorTraicionesTotales: number;  
        /* Reglas de la clase para variables -6 */
    private acumuladorDañoAños: number;         

    constructor() {
        super();
        this.nombre = 'Samuel Esteves'; 
        this.flagAlertaDefensiva = false;
        this.contadorTraicionesTotales = 0;
        this.acumuladorDañoAños = 0;
    }

    override confesar(): boolean {
        /* Reglas de la clase para variables -7 */
        const nombreComplice = this.complice.nombre;
        /* Reglas de la clase para variables -8 */
        const historialComplice = (this.historial as any)[nombreComplice];

        if (!historialComplice || historialComplice.length === 0) {
            return false;
        }

        /* Reglas de la clase para variables -9 */
        const cantidadRondas = historialComplice.length;
        /* Reglas de la clase para variables -10 */
        const ultimaJugadaRival = historialComplice[cantidadRondas - 1];

        if (ultimaJugadaRival === true) {
            this.contadorTraicionesTotales++; 
            this.acumuladorDañoAños += 5;     
        }

        if (this.acumuladorDañoAños >= 15) {
            this.flagAlertaDefensiva = true; 
        }

        if (this.flagAlertaDefensiva && ultimaJugadaRival === false) {
            this.flagAlertaDefensiva = false; 
            this.acumuladorDañoAños = 0;      
        }

        if (this.flagAlertaDefensiva) {
            return true; 
        }

        return ultimaJugadaRival; 
    }
}