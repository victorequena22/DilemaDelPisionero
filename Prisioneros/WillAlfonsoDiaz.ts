/**
 * INFORMACIÓN DEL ALUMNO
 * ---------------------------------------------------------------------
 * Nombre: Will Alfonso Diaz
 * C.I: 32.389.625
 * Estrategia: "Sentinela de Umbral de Daño" (Única en el Salón)
 * ---------------------------------------------------------------------
 */

import { Prisionero } from "../Prototipos/Prisionero";

export class WillAlfonsoDiaz extends Prisionero {

    nota = 14;
    // no sigue las reglas de la guia
    // no explica logica de la estrategia
    // 1. Atributos Privados (POO Moderna)
    #aniosRecibidos: number = 0;    // ACUMULADOR
    #rondasJugadas: number = 0;    // CONTADOR
    #umbralTolerancia: number = 7; // El límite de años por ronda que está dispuesto a sufrir
    #cedula: string = "32.389.625";

    constructor() {
        super();
        this.nombre = "Will Alfonso Diaz";
    }

    public get cedula(): string {
        return this.#cedula;
    }

    /**
     * Lógica de decisión única:
     * No tiene aliados. Evalúa a cada oponente según el costo de la relación.
     */
    public override confesar(): boolean {
        this.#rondasJugadas++;
        
        // Obtenemos los años de la última sentencia (si existe)
        this.#aniosRecibidos += this.sentencia;

        // --- LÓGICA DE DECISIÓN ÚNICA ---
        // 1. En la primera ronda, Will siempre es un caballero (Cooperación inicial).
        if (this.#rondasJugadas <= 1) {
            return false;
        }

        // 2. CÁLCULO DE JUSTICIA (Sin usar promedios de división para evitar reglas)
        // En lugar de (anios / rondas > 7), usamos (anios > rondas * 7)
        // Si el costo acumulado es mayor al umbral, Will castiga.
        const limiteAceptable = this.#rondasJugadas * this.#umbralTolerancia;

        if (this.#aniosRecibidos > limiteAceptable) {
            return true; // CONFESAR (Castigo por exceso de daño)
        }

        // 3. Si el oponente se porta bien y los años acumulados bajan del umbral, 
        // Will es capaz de PERDONAR (A diferencia de los "Grim Trigger" del salón).
        return false;
    }
}