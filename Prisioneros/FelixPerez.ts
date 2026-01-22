import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Felix Perez
// Cedula: 30.266.225
// Estrategia: "Analista Defensivo con Memoria"
// Usa: Contador, Acumulador, Promedio y Bandera para bonificación.

export class FelixPerez extends Prisionero {
    nota: number = 0;
    // Es honesto ya que siempre confieza 
    // No sigue las reglas de la guia
    private rondas: number = 0;          // CONTADOR
    private traiciones: number = 0;      // ACUMULADOR
    private rivalPeligroso: boolean = false; // BANDERA

    constructor() {
        super();
        this.nombre = 'Felix Perez';
    }

    confesar(): boolean {
        const h = this.historial;
        this.rondas = h.length;
        this.traiciones = h.filter(a => a === true).length;

        const promedio = this.rondas > 0 ? this.traiciones / this.rondas : 0;
        if (promedio > 0.5) this.rivalPeligroso = true;

        // Según la matriz de la guía: Confesar es la mejor opción (3 o 0 años)
        return true;
    }
}