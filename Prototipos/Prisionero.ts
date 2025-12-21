import { Interrogador } from "./Interrogador";
import { Persona } from "./Persona";

export class Prisionero extends Persona {
    #sentencia: number = 0;
    #interrogador!: Interrogador;
    #complice!: Prisionero;
    #historial: Record<string, boolean[]> = {};
    nota = 0;
    //get
    get complice() { return this.#complice; }
    get sentencia() { return this.#sentencia; }
    get historial() {
        const n = this.#complice.nombre;
        if (this.#historial[n] === undefined) {
            this.#historial[n] = [];
        }
        return this.#historial[n];
    }
    //set
    set complice(complice: Prisionero) { this.#complice = complice; }
    set interrogador(interrogador: Interrogador) { this.#interrogador = interrogador; }
    set historial(historial: boolean[]) {
        this.#historial[this.#complice.nombre] = historial;
    }
    //metodos 
    confesar(_i: Interrogador) { return false; }
    juicio(condena: number) {
        if (this.#interrogador.prisionero1.nombre !== this.nombre) {
            this.historial.push(this.#interrogador.respuesta1);
        } else {
            this.historial.push(this.#interrogador.respuesta2);
        }
        this.#sentencia += condena;
    }
}