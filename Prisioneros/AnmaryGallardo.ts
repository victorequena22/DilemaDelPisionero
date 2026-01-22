import { Prisionero } from "../Prototipos/Prisionero";

// Anmary Gallardo Freitez
// CI: 31.596.620
// Este prisiones es emocional
//Si el miedo es mayor de 70, traiciona.
// Si es aliado, no traiciona.
// Si el enojo es mayor de 60, traiciona.
// Si la confianza es mayor de 60, no traiciona.
// Si fue traicionado en la ultima ronda, traiciona.

export class AnmaryGallardo extends Prisionero {
    nota: number = 20;
    //variables acumuladoras 
    #confianza: number;
    #miedo: number;
    #enojo: number;
    // variable bandera
    #lista_Aliados: string[]

    constructor() {
        super();
        this.nombre = 'Anmary Gallardo';
        this.#lista_Aliados = ["Julliet Uzcategui", "Mariel Granadillo", "Diego Bustamante"];
        this.#confianza = 0;
        this.#miedo = 0;
        this.#enojo = 0;
    }
    confesar() {
        let historial = this.historial;
        if (historial[historial.length - 1]) {
            this.#confianza = Math.max(0, this.#confianza - 30);
            this.#miedo = Math.max(100, this.#miedo + 20);
            this.#enojo = Math.max(100, this.#enojo + 10);

        } else {
            this.#confianza = Math.max(100, this.#confianza + 20);
            this.#miedo = Math.max(0, this.#miedo - 10);
            this.#enojo = Math.max(0, this.#enojo - 5);
        }
        if (this.#miedo > 70) {
            return true;
        }
        if (this.#enojo > 60) {
            return true;
        }
        if (this.#lista_Aliados.includes(this.complice.nombre)) {
            return false;
        }
        if (this.#confianza > 60) {
            return false;
        }
        if (historial[historial.length - 1]) {
            return true;
        }
        return false;
    }
}

