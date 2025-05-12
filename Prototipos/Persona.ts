import { PersonaInterface } from "./interface";


export class Persona implements PersonaInterface {
    #nombre: string = "";
    #historial: any = {};
    getNombre() { return this.#nombre; }
    setNombre(nombre: string) { this.#nombre = nombre; }
    getHistorial(nombre: string) {
        if (this.#historial[nombre] === undefined) {
            this.#historial[nombre] = [];
        }
        return this.#historial[nombre] as boolean[];
    }
    setHistorial(historial: any) { this.#historial = historial; }
}