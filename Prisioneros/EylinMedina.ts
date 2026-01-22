/**
 * INFORMACIÓN DEL ALUMNO
 * ---------------------------------------------------------------------
 * Nombre: Eylin Medina
 * Cédula: 32.593.949
 * Estrategia: "Auditoría de Confianza Progresiva" (Sincronizada)
 * ---------------------------------------------------------------------
 */

import { Prisionero } from "../Prototipos/Prisionero";

export class EylinMedina extends Prisionero {
    nota = 0;
    // no explica la estrategia en el codigo
    // no cumple las reglas de la guia
    // una ves en modo defencivo no sale por lo que se comporta como honesto
    // Saulperez ya tiene el modo venganza
    // 1. POO: Encapsulamiento con atributos privados (#)
    #faltasCometidas: number = 0;
    #modoDefensivo: boolean = false;
    #sumaAnios: number = 0;      // ACUMULADOR
    #contadorRondas: number = 0; // CONTADOR

    constructor() {
        super();
        this.nombre = "Eylin Medina";
    }

    /**
     * LÓGICA PRINCIPAL (Adaptada al motor del juego)
     */
    public override confesar(): boolean { 
        this.#contadorRondas++;
        const h = this.historial;
        const oponente = this.complice.nombre.toLowerCase();

        // --- 1. ALIANZA ESTRATÉGICA AMPLIADA ---
        // Ahora incluye a todo el equipo para evitar fuego amigo
        const equipo = ["fabiola", "valeria", "elienny", "cristian", "orleandys"];
        if (equipo.some(integrante => oponente.includes(integrante))) {
            return false; // Cooperación garantizada con aliados
        }

        // --- 2. PROCESAMIENTO DE DATOS (Sin promedios) ---
        if (h.length > 0) {
            const ultimaAccionRival = h[h.length - 1];
            
            if (ultimaAccionRival === true) { // Fue Traición
                this.#faltasCometidas++;
                this.#sumaAnios += 10;
            } else { // Fue Cooperación
                this.#sumaAnios += 5;
            }
        }

        // --- 3. DISPARADORES DE SEGURIDAD (Sin azar) ---
        // Si detecta 2 traiciones, activa castigo
        if (this.#faltasCometidas >= 2) {
            this.#modoDefensivo = true;
        }

        // Lógica de Auditoría: Si el costo acumulado supera el límite aceptable
        // (Sustituimos promedio por comparación lineal: años > rondas * 7)
        const umbralCosto = this.#contadorRondas * 7;

        if (this.#modoDefensivo || this.#sumaAnios > umbralCosto) {
            return true; // CONFESAR (Traicionar para protegerse)
        }

        return false; // NEGAR (Seguir cooperando)
    }
}