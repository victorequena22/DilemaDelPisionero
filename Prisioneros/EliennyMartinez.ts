import { Prisionero } from "../Prototipos/Prisionero";

export class EliennyMartinez extends Prisionero {
    nota = 18;
    // no sigue las reglas de la guia
    // 1. ATRIBUTOS PRIVADOS 
    #puntosDeConfianza: number = 10; 
    #totalAnios: number = 0;         // ACUMULADOR
    #rondas: number = 0;             // CONTADOR
    #enEstadoCritico: boolean = false; // BANDERA

    constructor() {
        super();
        this.nombre = "Elienny Martinez";
    }

    public override confesar(): boolean {
        this.#rondas++; // Uso del CONTADOR
        const h = this.historial;

        // --- LÓGICA DE ALIANZAS ---
        // Sigue protegiendo a Fabiola y sus amigos
        const aliados = ["fabiola", "cristian", "eylin", "orleandys"];
        const nombreOponente = this.complice.nombre.toLowerCase();
        
        if (aliados.some(a => nombreOponente.includes(a))) {
            return false; // Siempre coopera con aliados
        }

        // --- LÓGICA DE ACTUALIZACIÓN (Sin porcentajes ni azar) ---
        if (h.length > 0) {
            const ultimaTraicion = h[h.length - 1];
            
            if (ultimaTraicion) {
                // Si la traicionan, la confianza baja drásticamente (Resta entera)
                this.#puntosDeConfianza -= 4;
                this.#totalAnios += 10; // ACUMULADOR
            } else {
                // Si cooperan, la confianza sube (Suma entera)
                this.#puntosDeConfianza = Math.min(10, this.#puntosDeConfianza + 1);
                this.#totalAnios += 5; // ACUMULADOR
            }
        }

        // --- ACTIVACIÓN DE BANDERA ---
        // Si los puntos bajan de 3, entra en modo defensivo
        if (this.#puntosDeConfianza < 3) {
            this.#enEstadoCritico = true;
        } else if (this.#puntosDeConfianza > 7) {
            this.#enEstadoCritico = false; // Solo sale del estado crítico si recupera mucha confianza
        }

        // --- DECISIÓN FINAL (Estructura Selectiva) ---
        if (this.#enEstadoCritico) {
            return true; // Confesar (Traicionar)
        }

        return false; // Negar (Cooperar)
    }
}