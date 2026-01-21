/**
 * INFORMACIÓN DEL ALUMNO
 * ---------------------------------------------------------------------
 * Nombre: Fabiola Sanchez
 * Estrategia: "Centinela Adaptativo"
 * C.I:32.599.781
 * EXPLICACIÓN: 
 * Estrategia reactiva con memoria persistente. 
 * 1. COOPERACIÓN INICIAL: Inicia con NEGAR para buscar el puntaje mínimo.
 * 2. ALIANZA: Identifica aliados por nombre para asegurar beneficio mutuo.
 * 3. PROTECCIÓN ANTICICLOS: Si el oponente confiesa una vez, la bandera 
 * 'traicionado' se activa permanentemente, rompiendo cualquier ciclo 
 * de engaño del rival y protegiendo mi puntaje.
 * 4. ANÁLISIS ESTADÍSTICO: Usa el promedio de años recibidos para detectar
 * si la estrategia actual es ineficiente y cambiar a modo defensivo.
 * ---------------------------------------------------------------------
 */

import { Prisionero } from "./Prototipos/Prisionero";

export class FabiolaSanchez extends Prisionero {
    
    private traicionado: boolean = false;
    private sumaAniosRecibidos: number = 0;
    private contadorRondas: number = 0;

    constructor() {
        super();
        this.nombre = "Fabiola Sanchez";
    }

    public obtenerSeleccion(nombreOponente: any, ultimaSeleccionOponente: any): string {
        this.contadorRondas++;

        // Actualización del acumulador basado en la ronda anterior
        // (Simulación de años: si yo cooperé y él confesó, recibí 10 años)
        if (ultimaSeleccionOponente === "CONFESAR") {
            this.traicionado = true;
            this.sumaAniosRecibidos += 10;
        } else if (ultimaSeleccionOponente === "NEGAR") {
            this.sumaAniosRecibidos += 2; // Ambos cooperan
        }

        // 1. Alianza 
        const oponente = nombreOponente?.toString().toLowerCase() || "";
        if (oponente.includes("elienny") || oponente.includes("eylin") || oponente.includes("orleandys")) {
            return "NEGAR";
        }

        // 2. Primer turno
        if (ultimaSeleccionOponente === null) {
            return "NEGAR";
        }

        // 3. Cálculo de Promedio  
        let promedio = this.contadorRondas > 0 ? this.sumaAniosRecibidos / this.contadorRondas : 0;

        // 4. Lógica de Confesión 
        // Si hay traición previa o el daño promedio es muy alto, confesamos.
        if (this.traicionado || promedio > 6) {
            return "CONFESAR";
        }

        // Por defecto cooperar
        return "NEGAR";
    }
}