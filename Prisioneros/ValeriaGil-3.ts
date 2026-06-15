import { Prisionero } from "../Prototipos/Prisionero";

/**
 * ESTUDIANTE: Valeria Gil
 * CEDULA: 32.623.127
 * ESTRATEGIA: "Tríada Analítica Autónoma"
 * Explicación: Lógica individual estructurada en 3 caminos independientes sin dependencias externas. 
 * Evalúa traición acumulada, sistema de castigo por desconfianza a corto plazo con tregua 
 * automática tras 3 turnos (desbloqueo), y cooperación por defecto. Aísla las estadísticas por oponente.
 */
/** ValeriaGil-3.ts  no coincide con el nombre de la clase -1*/
/** Rompe el juego*/
/** La estrategia y el codigo en su mayoria esta bien pero rompe ele juego arreglalo para tener nota */
export class ValeriaGil extends Prisionero {
    
    #medidorConfianza: number = 100;     // BANDERA 
    #contadorTraiciones: number = 0;     // CONTADOR 
    #aniosAcumulados: number = 0;        // ACUMULADOR 

    // 2. PROPIEDADES DE ESTADO INTERNO Y RESTRICCIONES 
    #ultimaSentencia: number = 0;
    #turnosEnCastigo: number = 0;
    #ultimoOponente: string = "";

    public nombre: string = "Valeria Gil";
    public complice!: Prisionero;

    constructor() {
        super();
    }

    // Propiedad pública reglamentaria para el Juez
    public get sentencia(): number { 
        return super.sentencia; 
    }

    
    public confesar(): boolean {
        const nombreOponente = this.complice.nombre;

        // Control de aislamiento de Venganza: Si el rival cambia, se resetea el estado (Regla de Venganza Aislada) 
        if (nombreOponente !== this.#ultimoOponente) {
            this.#ultimoOponente = nombreOponente;
            this.#medidorConfianza = 100;
            this.#contadorTraiciones = 0;
            this.#turnosEnCastigo = 0;
        }

        // =========================================================================
        // CAMINO 1: Defensa ante Traidor Reincidente (Análisis del Contador)
        // Si el rival ha demostrado ser hostil acumulando más de 5 traiciones, 
        // se asume una postura firme de supervivencia confesando el crimen.
        // =========================================================================
        if (this.#contadorTraiciones > 5) {
            return true; // Confesar (Traicionar)
        }

        // =========================================================================
        // CAMINO 2: Lógica de Bloqueo a Corto Plazo con Condición de Desbloqueo Activa
        // Si la confianza cae, nos defendemos, pero evitamos el bucle infinito.
        // =========================================================================
        if (this.#medidorConfianza < 60) {
            // CONDICIÓN DE DESBLOQUEO: Si ya hemos castigado durante 3 turnos seguidos, 
            // detenemos la represalia automáticamente para ofrecer una oportunidad de paz.
            if (this.#turnosEnCastigo >= 3) {
                this.#turnosEnCastigo = 0;
                this.#medidorConfianza = 75; // Restauración parcial del voto de confianza
                return false;                // Ofrece tregua / Cooperar (Negar)
            }
            
            this.#turnosEnCastigo++;
            return true; // Respuesta de bloqueo: Castigar al rival (Confesar) 
        }

        // =========================================================================
        // CAMINO 3: Estado de Cooperación de Buena Fe (Por Defecto)
        // Mientras el oponente se comporte de forma justa, mantenemos el beneficio mutuo.
        // =========================================================================
        return false; // Cooperar (Negar crímenes)
    }

    /**
     * Actualización interna de las memorias, contadores y acumuladores del caso
     */
    public recordar(oponenteConfeso?: boolean): void {
        if (oponenteConfeso === undefined) return;

        
        if (oponenteConfeso) {
            this.#contadorTraiciones++;    // Suma al CONTADOR 
            this.#medidorConfianza -= 35;  // Reduce la BANDERA de confianza 
        } else {
            // Si el rival coopera, la confianza se recupera paulatinamente hasta el límite
            if (this.#medidorConfianza < 100) this.#medidorConfianza += 15;
            this.#turnosEnCastigo = 0;     // Resetea el contador de turnos de castigo aplicados
        }

        // LÓGICA MATEMÁTICA DEL ACUMULADOR (Calcula los años recibidos en la ronda actual) 
        const condenaRonda = this.sentencia - this.#ultimaSentencia;
        if (condenaRonda > 0) {
            this.#aniosAcumulados += condenaRonda; // Suma al ACUMULADOR 
        }
        this.#ultimaSentencia = this.sentencia;
    }

    public override juicio(condena: number): void {
        super.juicio(condena);
        
        // Según la matriz de penas oficiales de la página 3 del Laboratorio III[cite: 166, 167]:
        // Una condena de 3 años (ambos confiesan) o 10 años (tú niegas, el otro confiesa)
        // significa de forma matemática que tu oponente te ha traicionado.
        const oponenteTraiciono = (condena === 3 || condena === 10);
        
        // Envía el veredicto detectado a la memoria del prisionero
        this.recordar(oponenteTraiciono);
    }
}

