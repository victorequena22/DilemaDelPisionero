import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Jesus Cruz
// Cedula: 31.041.811
// Estrategia: Coopera con amigos, castiga enemigos y detecta traición crónica.
export class JesusCruz extends Prisionero {
    nota = 20;
    // Bandera: lista de amigos (con ellos siempre coopera)
    #listaAmigos = ["Diego Bustamante", "Mauricio Carrasco", "Albany Jimenez"];
    // Bandera: lista de enemigos (con ellos siempre traiciona)
    #listaEnemigos = ["Jose Gonzalez", "Juan Cortez", "Daniela Brito"];
    #contadorTraiciones = 0;
    #acumuladorTraiciones = 0;
    constructor() {
        super();
        this.nombre = "Jesus Cruz";
    }
    confesar(): boolean {
        const n = this.complice.nombre;
        const h = this.historial;
        if (this.#listaAmigos.includes(n)) {
            return false;
        }
        if (this.#listaEnemigos.includes(n)) {
            return true;
        }
        if (h.at(-1)) {
            this.#contadorTraiciones++;
            this.#acumuladorTraiciones += 1;
        }
        if (h.length < 10) {
            return false;
        }
        const t = h.slice(-10).filter(j => j).length;
        return !!Math.round(t / 10) && t >= 7;
    }
    get listaAmigos() {
        return this.#listaAmigos;
    }
    get listaEnemigos() {
        return this.#listaEnemigos;
    }
    get contadorTraiciones() {
        return this.#contadorTraiciones;
    }
    get acumuladorTraiciones() {
        return this.#acumuladorTraiciones;
    }
}