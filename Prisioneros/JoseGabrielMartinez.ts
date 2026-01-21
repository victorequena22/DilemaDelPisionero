/**
 * Nombre: Jose Gabriel Martinez
 * C.I: 32.178.820
 * Adaptado a las reglas de la Unidad III - Prof. Victor Requena
 */

import { Prisionero } from "../Prototipos/Prisionero"; // Agregamos un punto extra (..) para subir de carpeta

export class JoseMartinez extends Prisionero {
    nota = 0;
    // No esrta jugando el juego
    // No sigue las reglas de la guia
    // Atributo privado con '#' (Encapsulamiento - Pág 14)
    #historialOponente: boolean[] = [];

    constructor() {
        super();
        // ESTO DEBE IR AQUÍ ADENTRO
        this.nombre = 'Jose Gabriel Martinez';
    }

    // Método privado para la lógica (Abstracción)
    #obtenerAccionPasada(): boolean {
        if (this.#historialOponente.length === 0) return false;
        return this.#historialOponente[this.#historialOponente.length - 1];
    }

    public obtenerSeleccion(nombreOponente: any, ultimaSeleccionOponente: any): string {
        // Guardamos lo que hizo el rival
        if (ultimaSeleccionOponente !== null) {
            this.#historialOponente.push(ultimaSeleccionOponente === "CONFESAR");
        }

        // Si el método privado dice que la última fue traición, confesamos
        return this.#obtenerAccionPasada() ? "CONFESAR" : "NEGAR";
    }
}