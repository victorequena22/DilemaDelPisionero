import { PersonaInterface } from "./interface";


export class Persona implements PersonaInterface {
    #nombre: string = "";
    #historial: Record<string, boolean[]> = {};
    getNombre() { return this.#nombre; }
    setNombre(nombre: string) { this.#nombre = nombre; }
    getHistorial(nombre: string) {
        if (this.#historial[nombre] === undefined) {
            this.#historial[nombre] = [];
        }
        return this.#historial[nombre];
    }
    setHistorial(historial: any) { this.#historial = historial; }
}