import { Interrogador } from "../Prototipos/Interrogador"
import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Daniela Brito
// Cedula: 32224125
//Siempre coopera con colega ("Veronica Rivas").
//Siempre confiesa contra antagonistas ("Jesus Cruz", "Albany Jimenez").
//Si el cómplice no es colega ni antagonista, coopera durante las primeras 3 rondas.
//A partir de la cuarta ronda, confiesa si:
//El cómplice traicina mas de la mitad de las veces.
//Nunca ha sido traicionada en 6 o más rondas.
//O si la última ronda fue traición.
//En cualquier otro caso, coopera.
export class DanielaBrito extends Prisionero {
    
    nota = 20;
    // No se explica correctamente estrategia 

    // BANDERA: Colega con quien siempre coopera
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