import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Maria Alejandra Andrade
// Cedula: 32306263
// Estrategia: Evalúa al cómplice actual usando su historial.
// Confiesa si hay tendencia a la deslealtad o traición reciente.
export class MariaAndrade extends Prisionero {
    nota = 0;
    // se parece demaciado a DanielaBrito
    // BANDERA: Aliados con los que siempre coopera
    #aliados = ["Daniela Brito", "Maria Jose Escalona"];
    // BANDERA: Rivales con los que siempre confiesa
    #rivales = ["Luis Gallardo", "Veronica Rivas"];
    constructor() {
        super();
        this.nombre = "Maria Andrade";
    }
    confesar(): boolean {
        const n = this.complice.nombre;
        const h = this.historial;
        if (this.#aliados.includes(n)) return false;
        if (this.#rivales.includes(n)) return true;
        if (h.length === 0) return false;
        const contadorRondas = h.length;
        const acumuladorDeslealtad = h.filter(j => j).length;
        const ultima = h.at(-1);
        const tendenciaDesleal = !!Math.round(acumuladorDeslealtad / contadorRondas);
        return tendenciaDesleal || ultima === true;
    }
    get aliados() {
        return this.#aliados;
    }
    get rivales() {
        return this.#rivales;
    }
}