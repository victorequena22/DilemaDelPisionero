import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Maria Alejandra Andrade
// Cedula: 32306263
// Estrategia: Coopera con aliados, confiesa a rivales y, para los demás,
// confiesa si el cómplice es mayormente desleal o si es inestable y acaba
// de traicionar.
export class MariaAndrade extends Prisionero {
    nota = 17;
    // No se explica correctamente la estrategia en el codigo
    // Bandera: aliados con los que siempre coopera
    #aliados = ["Daniela Brito", "Maria Jose Escalona"];
    // Bandera: rivales con los que siempre confiesa
    #rivales = ["Luis Gallardo", "Veronica Rivas"];
    constructor() {
        super();
        this.nombre = "Maria Andrade";
    }
    confesar() {
        const n = this.complice.nombre;
        const h = this.historial;
        if (this.#aliados.includes(n)) return false;
        if (this.#rivales.includes(n)) return true;
        if (h.length < 3) return false;
        let cambios = 0;
        for (let i = 1; i < h.length; i++) {
            if (h[i] !== h[i - 1]) cambios++;
        }
        const rondas = h.length;
        const traiciones = h.filter(j => j).length;
        const inestable = !!Math.round(cambios / rondas);
        const desleal = !!Math.round(traiciones / rondas);
        return desleal || (inestable && h.at(-1) === true);
    }
    get aliados() {
        const a = this.#aliados;
        return a;
    }
    get rivales() {
        const r = this.#rivales;
        return r;
    }
    get rondasJugadas() {
        const t = this.historial.length;
        return t;
    }
    get totalTraiciones() {
        const t = this.historial.filter(j => j).length;
        return t;
    }
}
