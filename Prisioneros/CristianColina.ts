import { Prisionero } from "../Prototipos/Prisionero";

export class CristianColina extends Prisionero {
    nota = 4;
    // Es igual a confiable 
    // no sigue las reglas de la guia
    #sumaAniosRecibidos: number = 0; // ACUMULADOR
    #contadorRondas: number = 0;    // CONTADOR
    #cedula: string = "32.467.458";

    constructor() {
        super();
        this.nombre = "Cristian Colina";
    }

    // Cumplimos con el método que busca el motor del profesor
    public override confesar(): boolean {
        const oponente = this.complice.nombre.toLowerCase();
        const equipo = ["fabiola", "valeria", "elienny", "eylin", "orleandys"];

        // Si es del equipo, COOPERAMOS (false) para que ellas ganen.
        if (equipo.some(e => oponente.includes(e))) return false;

        // Para extraños: Mantenemos la estrategia de "Mártir" (siempre cooperar)
        // O si quieres que sea un mártir real, simplemente devuelve siempre false.
        return false; 
    }

    public registrarAnios(): void {
        this.#contadorRondas++;
        this.#sumaAniosRecibidos += this.sentencia;
    }
}