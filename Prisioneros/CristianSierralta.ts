import { Prisionero } from '../Prototipos/Prisionero';

/**
 * @author Cristian Sierralta
 * @Cedula 32014233
 * @Estrategia:
 * - Coopera incondicionalmente con amigos.
 * - Traiciona incondicionalmente a enemigos.
 * - Para el resto, castiga la traición crónica (≥7 de 10 últimas rondas).
 * - Por defecto, coopera.
 */
/**
    Estrategia: 10puntos 
    Código:     0puntos Arregla el codigo para que no rompa el juego
    Bonos:      2puntos
    Reglas:    -13puntos
 */
export class CristianSierralta extends Prisionero {
    nota = -1;
    /* Reglas de la clase para variables -3 */
    private readonly amigos: string[] = ['Mauricio Peña', 'Diego Oropesa'];
    /* Reglas de la clase para variables -6 */
    private readonly enemigos: string[] = ['Fabricio Morales', 'Daniel Melendez'];
    /* Reglas de la clase para variables -8 */
    private contadorTraiciones: number = 0;
    /* Reglas de la clase para variables -10 */
    private acumuladorTraiciones: number = 0;
    /* Esto no cumple con el POO y rompe el juego */
    public nombre: string = 'Cristian Sierralta';

    constructor() {
        super();
        // Aseguramos que el historial existe (práctica defensiva)
        this.historial = this.historial || [];
    }

    confesar(): boolean {
        /* Reglas de la clase para variables -11 */
        const nombreOponente = this.complice?.nombre || '';
        /* Reglas de la clase para variables -12 */
        const historialOponente = this.historial;

        // 1. Regla de Amigos: Siempre Cooperar (false = no confesar = cooperar)
        if (this.amigos.includes(nombreOponente)) {
            return false;
        }

        // 2. Regla de Enemigos: Siempre Traicionar (true = confesar = traicionar)
        if (this.enemigos.includes(nombreOponente)) {
            /** No hacen nada por la estrategia */
            this.contadorTraiciones++;
            this.acumuladorTraiciones++;
            return true;
        }

        // 3. Regla de Traición Crónica: Si en las últimas 10 rondas el oponente
        //    ha traicionado (confesado) 7 o más veces, yo le traiciono.
        if (historialOponente.length >= 10) {
            const ultimas10 = historialOponente.slice(-10);
            /* Reglas de la clase para variables -13 */
            const traicionesRecibidas = ultimas10.filter((accion) => accion === true).length;
            if (traicionesRecibidas >= 7) {
                /** No hacen nada por la estrategia */
                this.contadorTraiciones++;
                this.acumuladorTraiciones++;
                return true; // Castigo la traición crónica
            }
        }

        // 4. Comportamiento por Defecto: Cooperar
        return false;
    }
}
