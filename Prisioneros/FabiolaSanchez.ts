/**
 * INFORMACIÓN DEL ALUMNO
 * ---------------------------------------------------------------------
 * Nombre: Fabiola Sanchez
 * Estrategia: "Centinela Adaptativo" con Memoria de Historial
 * C.I: 32.599.781
 * ---------------------------------------------------------------------
 */

import { Prisionero } from "../Prototipos/Prisionero";

export class FabiolaSanchez extends Prisionero {
    nota = 0;
    // Esto es vengador por lo que no es valido 
    // 1. Atributos Privados con '#' (Encapsulamiento)
    #traicionado: boolean = false;
    #sumaAniosRecibidos: number = 0;
    #contadorRondas: number = 0;
    #historial: boolean[] = []; // Guardará 'true' si el rival confesó

    constructor() {
        super();
        this.nombre = "Fabiola Sanchez";
    }

    // 2. Método de Lógica: Revisa si alguna vez hubo traición en el historial
    // Representa la acción de "analizar el pasado" de la clase
    public confesar(): boolean {
        return this.#historial.includes(true);
    }

    // 3. Métodos de Interfaz (Getters y Setters)
    public get historial(): boolean[] {
        return this.#historial;
    }

    public get traicionado(): boolean {
        return this.#traicionado;
    }

    public set traicionado(valor: boolean) {
        this.#traicionado = valor;
    }

    /**
     * Lógica de Decisión
     */
    public obtenerSeleccion(nombreOponente: any, ultimaSeleccionOponente: any): string {
        this.#contadorRondas++;

        // Actualización del Historial y Daño
        if (ultimaSeleccionOponente !== null) {
            const fueTraicion = (ultimaSeleccionOponente === "CONFESAR");
            this.#historial.push(fueTraicion); // Guardamos el evento en el historial

            if (fueTraicion) {
                this.traicionado = true;
                this.#sumaAniosRecibidos += 10;
            } else {
                this.#sumaAniosRecibidos += 2;
            }
        }

        // --- REGLAS DE DECISIÓN ---

        // A. Alianza (Identificación de aliados por nombre)
        const oponente = nombreOponente?.toString().toLowerCase() || "";
        if (oponente.includes("elienny") || oponente.includes("eylin") || oponente.includes("orleandys")) {
            return "NEGAR";
        }

        // B. Primer turno
        if (ultimaSeleccionOponente === null) {
            return "NEGAR";
        }

        // C. Análisis de Eficiencia
        let promedio = this.#contadorRondas > 0 ? this.#sumaAniosRecibidos / this.#contadorRondas : 0;

        // D. Lógica de Protección (Uso del nuevo método confesar() y promedio)
        // Si el método confesar() detecta un 'true' en el historial, nos defendemos
        if (this.confesar() || promedio > 6) {
            return "CONFESAR";
        }

        return "NEGAR";
    }
}