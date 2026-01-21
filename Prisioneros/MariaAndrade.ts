import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Maria Alejandra Andrade
// Cedula: 32306263
// Estrategia: Coopera con aliados específicos, castiga a rivales declarados 
// y utiliza un análisis de frecuencia de traición para decisiones futuras.
export class MariaAndrade extends Prisionero {
    nota = 0;
    //estas usando una variable global (acumuladorTraiciones) para calidar a todos
    //no tienes una forma de salir y no de verificar por cómplice
    // tambien DiegoBustamante
    // Lista de aliados: con ellos siempre coopera (false)
    #listaAliados = ["Daniela Brito", "Maria Jose Escalona"];
    // Lista de rivales: con ellos siempre traiciona (true)
    #listaRivales = ["Luis Gallardo", "Veronica Rivas"];
    #contadorTraiciones = 0;
    #acumuladorTraiciones = 0;
    constructor() {
        super();
        this.nombre = "Maria Andrade";
    }
    confesar(): boolean {
        const nombreOponente = this.complice.nombre;
        const historial = this.historial;
        if (this.#listaAliados.includes(nombreOponente)) return false;
        if (this.#listaRivales.includes(nombreOponente)) return true;
        if (historial.length === 0) return false;
        if (historial.at(-1)) {
            this.#contadorTraiciones++;
            this.#acumuladorTraiciones++;
        }
        if (this.#acumuladorTraiciones >= 3) {
            return true;
        }
        if (historial.length >= 5) {
            const promedio = this.#acumuladorTraiciones / historial.length;
            if (!!Math.round(promedio)) return true;
        }
        return false;
    }
    get listaAliados() {
        return this.#listaAliados;
    }
    get listaRivales() {
        return this.#listaRivales;
    }
    get contadorTraiciones() {
        return this.#contadorTraiciones;
    }
    get acumuladorTraiciones() {
        return this.#acumuladorTraiciones;
    }
}