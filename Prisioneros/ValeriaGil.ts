import { Prisionero } from "../Prototipos/Prisionero";

/**
 * Alumna: Valeria Gil
 * Cédula: 31.111.222
 * Estrategia: "Escalamiento de Castigo por Reincidencia"
 * * Lógica:
 * 1. BANDERA: Lista de aliados para cooperación garantizada.
 * 2. ACUMULADOR: Suma puntos de desconfianza (Traición = +2, Cooperación = -1).
 * 3. CONTADOR: Cuenta traiciones totales para un castigo definitivo si llega a 5.
 * 4. SIN PORCENTAJES: Decisiones basadas solo en comparaciones enteras.
 */
export class ValeriaGil extends Prisionero {
    nota = 4;
    // el comportamiento se vuelve honesto despues de la segunda ronda 
    // El comportamiento no coinside con la estrategia
    // No sigue las reglas de la guia
    // Atributos privados (Encapsulamiento)
    #puntosDesconfianza: number = 0; // ACUMULADOR
    #traicionesRecibidas: number = 0; // CONTADOR
    #equipo: string[];               // BANDERA

    constructor() {
        super();
        this.nombre = "Valeria Gil";
        // Sincronización con el grupo femenino y aliados estratégicos
        this.#equipo = ["fabiola", "eylin", "elienny", "orleandys", "cristian", ];
    }

    public override confesar(): boolean {
        const h = this.historial;
        const nombreRival = this.complice.nombre.toLowerCase();

        // 1. FILTRO DE ALIANZA (Prioridad 1)
        if (this.#equipo.some(aliado => nombreRival.includes(aliado))) {
            return false;
        }

        // 2. SEGURIDAD DE ARRANQUE (Ronda 1)
        if (h.length === 0) return false;

        // 3. ACTUALIZACIÓN DE JUICIO (Lógica de números enteros)
        const ultimaAccion = h[h.length - 1];

        if (ultimaAccion === true) {
            this.#traicionesRecibidas++; 
            this.#puntosDesconfianza += 2; // La traición pesa más
        } else {
            // El perdón es lento: si el rival coopera, bajamos 1 punto
            if (this.#puntosDesconfianza > 0) {
                this.#puntosDesconfianza -= 1;
            }
        }

        // 4. DECISIÓN DE JUICIO (Estructura Selectiva)
        
        // A. Castigo Irreversible: Si ha traicionado 5 veces en total
        if (this.#traicionesRecibidas >= 5) {
            return true;
        }

        // B. Castigo Temporal: Si el acumulador de desconfianza es alto (ej. 3 o más)
        if (this.#puntosDesconfianza >= 3) {
            return true;
        }

        // C. Ojo por Ojo Simple: Si la última fue traición, respondemos igual
        if (ultimaAccion === true) {
            return true;
        }

        // Por defecto, cooperamos
        return false;
    }
}