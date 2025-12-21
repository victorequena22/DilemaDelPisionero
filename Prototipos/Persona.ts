

export class Persona  {
    #nombre: string = "";
    get nombre() { return this.#nombre; }
    set nombre(nombre: string) { this.#nombre = nombre; }
}