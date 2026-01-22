import { Interrogador } from "../Prototipos/Interrogador"
import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Daniela Brito
// Cedula: 32224125
// Estrategia: Coopera al inicio y activa defensa si detecta deslealtad.
export class DanielaBrito extends Prisionero {
    nota = 16;
    // No se explica correctamente estrategia 
    // BANDERA: Colegas con los que siempre coopera
    #colegas = ["Veronica Rivas"];
    // BANDERA: Antagonistas con los que siempre confiesa
    #antagonistas = ["Jesus Cruz", "Albany Jimenez"];
    constructor() {
        super();
        this.nombre = "Daniela Brito";
    }
    confesar() {
        const n = this.complice.nombre;
        const h = this.historial;
        if (this.#colegas.includes(n)) return false;
        if (this.#antagonistas.includes(n)) return true;
        if (h.length < 3) return false;
        const rondas = h.length;
        const traiciones = h.filter(j => j).length;
        const centinela = !!Math.round(traiciones / rondas);
        const explotacion = (rondas >= 6 && traiciones === 0);
        return centinela || explotacion || h.at(-1) === true;
    }
    get colegas() {
        return this.#colegas;
    }
    get antagonistas() {
        return this.#antagonistas;
    }
    get rondasJugadas() {
        return this.historial.length;
    }
}