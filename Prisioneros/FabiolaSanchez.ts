// Subimos dos niveles (../../) para llegar a la raíz y entrar en Prototipos
import { Prisionero } from "../Prototipos/Prisionero";

/**
 * ESTUDIANTE: Fabiola Sanchez
 * C.I: 32.599.781
 * ESTRATEGIA: "Centinela de Tensión Dinámica"
 * No usa ciclos ni porcentajes. Usa una bandera que se activa tras 2 traiciones
 * y se apaga tras 2 cooperaciones. Incluye contador y acumulador.
 */
export class FabiolaSanchez extends Prisionero {
    nota = 0;
    // registrarDatos no se esta ejecutando, por lo que las variables no se activan 
    // Esto hace lo mismo que cofiable
    // usa para cambiarlo registrarDatos
    // Miembros privados con # (Puntos extra por POO moderna)
    #acumuladorAnios: number = 0;   // ACUMULADOR
    #contadorRondas: number = 0;    // CONTADOR
    #enTension: boolean = false;    // BANDERA
    
    #traicionesSeguidas: number = 0;
    #cooperacionesSeguidas: number = 0;

    constructor() {
        super();
        this.nombre = "Fabiola Sanchez";
    }

    // Exponer la sentencia heredada públicamente (evita error de propiedad)
    public get sentencia(): number { return super.sentencia; }

    /**
     * Método obligatorio según la guía.
     * Retorna true (Confesar) o false (Negar).
     */
    public override confesar(): boolean {
        this.#contadorRondas++; 

        if (this.#enTension) {
            // Si el oponente se porta bien 2 veces, perdonamos y bajamos bandera
            if (this.#cooperacionesSeguidas >= 2) {
                this.#enTension = false;
                this.#traicionesSeguidas = 0;
                return false;
            }
            return true; // Mientras haya tensión, nos defendemos (Confesar)
        }

        // Si nos traicionan 2 veces seguidas, subimos la bandera de tensión
        if (this.#traicionesSeguidas >= 2) {
            this.#enTension = true;
            return true;
        }

        return false; // Cooperación inicial
    }

    /**
     * Este método registra el resultado de la ronda.
     * Es vital para que el ACUMULADOR y el CONTADOR funcionen.
     */
    public registrarDatos(oponenteConfeso: boolean): void {
        if (oponenteConfeso) {
            this.#traicionesSeguidas++;
            this.#cooperacionesSeguidas = 0;
        } else {
            this.#cooperacionesSeguidas++;
            this.#traicionesSeguidas = 0;
        }
        
        // Sumamos la sentencia actual al acumulador (Punto extra)
        this.#acumuladorAnios += this.sentencia;
    }
}