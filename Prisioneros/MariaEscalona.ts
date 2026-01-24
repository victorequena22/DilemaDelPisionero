import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Maria Escalona
// Cedula: 32277537
// Estrategia: Coopera con aliados, confiesa a rivales y, para los demás,
// confiesa si el cómplice es mayormente desleal o si es inestable y acaba
// de traicionar.
export class MariaEscalona extends Prisionero {
    nota = 20;
    // Bandera: aliados con los que siempre coopera (hasta que analice su deslealtad)
    #aliados = ["Jose Barrios", "jesus rojas"];
    // Bandera: rivales con los que siempre confiesa
    #rivales = ["jogelys peña", "maria gonzalez"];

    constructor() {
        super();
        this.nombre = "Maria Escalona";
    }

    confesar() {
        const n = this.complice.nombre;
        const h = this.historial;

        // Prioridad por nombre
        if (this.#aliados.includes(n)) return false;
        if (this.#rivales.includes(n)) return true;

        // Periodo de observación
        if (h.length < 3) return false;

        let cambios = 0;
        for (let i = 1; i < h.length; i++) {
            if (h[i] !== h[i - 1]) cambios++;
        }

        const rondas = h.length;
        const traiciones = h.filter(j => j).length;
        
        // Lógica matemática original
        const inestable = !!Math.round(cambios / rondas);
        const desleal = !!Math.round(traiciones / rondas);

        // Si es desleal (>50% traiciones) o es inestable y acaba de traicionar
        return desleal || (inestable && h.at(-1) === true);
    }

    get aliados() {
        return this.#aliados;
    }

    get rivales() {
        return this.#rivales;
    }

    get rondasJugadas() {
        return this.historial.length;
    }

    get totalTraiciones() {
        return this.historial.filter(j => j).length;
    }
}