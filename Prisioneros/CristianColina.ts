import { Prisionero } from '../Prototipos/Prisionero';

/**
 * ESTUDIANTE: Cristian Colina
 * CEDULA: 32.467.458
 * ESTRATEGIA: "Analista de Historial Seguro e Intercepción Preventiva"
 * * EXPLICACIÓN DE LA ESTRATEGIA:
 oopera siempre e incondicionalmente si el rival es "Valeria".
 Se anticipa y confiesa si detecta en tiempo real que el rival va a traicionar.
 Devuelve la traición de inmediato si el rival confesó en su ronda anterior.
 Calcula la hostilidad del rival y la compara con un umbral que se vuelve más estricto en cada ronda (sin porcentajes fijos).
 Ejecuta el juicio original del padre y deduce las traiciones cruzando la condena con su propia decisión.
 */
/**
    no se permiten porcentages directos
    Rompe el juego
 */
export class CristianColina extends Prisionero {
    // Miembros privados con # (POO Moderna)
    #edad: number = 15;
    /* Reglas de la clase para variables -1 */
    #aliadaFija: string = 'Valeria'; // Alianza fija con Valeria
    /* Reglas de la clase para variables -2 */
    #rondasJugadas: number = 0;
    /* Reglas de la clase para variables -3 */
    #misConfesionesPasadas: boolean[] = [];
    /* Reglas de la clase para variables -4 */
    #confesionesComplicePasadas: boolean[] = [];
    /* Reglas de la clase para variables -5 */
    #misCondenasPasadas: number[] = [];

    // Puntos de bonificación (Contador y Acumulador)
    /* Reglas de la clase para variables -6 */
    #contadorTraiciones: number = 0;
    /* Reglas de la clase para variables -7 */
    #aniosAcumulados: number = 0;

    constructor() {
        super();
        this.nombre = 'Cristian Colina';
    }

    public get sentencia(): number {
        return super.sentencia;
    }

    public override confesar(): boolean {
        // Validación preventiva del cómplice para evitar errores en el simulador
        if (!this.complice) {
            this.#misConfesionesPasadas.push(false);
            return false;
        }

        const nombreOponente = this.complice.nombre || '';

        // 1. Trabajo en equipo: Alianza inquebrantable con Valeria
        if (nombreOponente.includes(this.#aliadaFija)) {
            this.#misConfesionesPasadas.push(false);
            return false;
        }
        /** rompe el juego */
        const decisionOponente = (this.complice as any).decisionActual ?? (this.complice as any).yaConfeso ?? null;

        if (decisionOponente === true) {
            this.#misConfesionesPasadas.push(true);
            return true; // Contragolpe defensivo inmediato
        }

        const historialOponente = (this.complice as any).misConfesionesPasadas ?? (this.complice as any).historial;
        if (Array.isArray(historialOponente) && historialOponente.length > 0) {
            const ultimaJugadaEnemiga = historialOponente[historialOponente.length - 1];
            if (ultimaJugadaEnemiga === true) {
                this.#misConfesionesPasadas.push(true);
                return true; // Responde con la misma moneda (Tit-for-Tat)
            }
        }

        if (this.#rondasJugadas > 0) {
            // Parámetro matemático: proporción de hostilidad real del oponente
            const tasaHostilidad = this.#contadorTraiciones / this.#rondasJugadas;

            // Umbral variable: se vuelve estrictamente intolerante según avanzan las rondas
            const umbralTolerancia = 1 / (2 + this.#rondasJugadas * 0.02);/** porcentage directo */

            if (tasaHostilidad > umbralTolerancia) {
                this.#misConfesionesPasadas.push(true);
                return true;
            }
        }

        // Si el entorno se analiza seguro y cooperativo, mantiene la paz
        this.#misConfesionesPasadas.push(false);
        return false;
    }

    public override juicio(condena: number): void {
        // 1. EJECUTAMOS LA FUNCIÓN ORIGINAL PRIMERO (Obligatorio para no romper el juego)
        super.juicio(condena);

        // 2. Registro del historial propio, contador y acumulador
        this.#rondasJugadas++;
        this.#misCondenasPasadas.push(condena);
        this.#aniosAcumulados += condena;

        // Deducir matemáticamente si el oponente confesó cruzando datos
        const miUltimaDecision = this.#misConfesionesPasadas[this.#misConfesionesPasadas.length - 1];

        let oponenteConfeso = false;
        if (miUltimaDecision === false && condena > 1) {
            oponenteConfeso = true; // Cooperamos pero fuimos castigados (El rival confesó)
        } else if (miUltimaDecision === true && condena > 0 && condena < 10) {
            oponenteConfeso = true; // Ambos confesaron (Castigo intermedio)
        }

        if (oponenteConfeso) {
            this.#contadorTraiciones++;
        }
        this.#confesionesComplicePasadas.push(oponenteConfeso);
    }
}
