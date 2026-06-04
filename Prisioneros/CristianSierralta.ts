import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Cristian sierralta
// Cedula: 32014233
// Estrategia: Coopera con amigos, castiga enemigos y detecta traición crónica.
/**
    Estrategia: 4puntos Que significa detecta traición crónica
    Código:     8puntos el código es correcto pero no refleja la estrategia descrita
    Bonos:      2puntos
    Reglas:    -6puntos
 */
/** cristianSierralta.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1 */
/** El nombre de la clase no cumple el CamelCase -2 */
export class cristianSierralta extends Prisionero {
    nota = 8;
    // Bandera: lista de amigos (con ellos siempre coopera)
     /* Reglas de la clase para variables -3 */
     /* No tengo complices con esos nombres */
    #listaAmigos = ["Mauricio peña", "Diego Oropeza ", ];
    // Bandera: lista de enemigos (con ellos siempre traiciona)
     /* Reglas de la clase para variables -4 */
    #listaEnemigos = ["Fabricio Morales", "Daniel Melendes"];
     /* Reglas de la clase para variables -5 */
    #contadorTraiciones = 0;
     /* Reglas de la clase para variables -6 */
    #acumuladorTraiciones = 0;
    constructor() {
        super();
        this.nombre = "Cristian Sierralta";
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
        /** Esto no hace nada */
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