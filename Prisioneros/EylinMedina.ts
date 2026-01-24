import { Prisionero } from "../Prototipos/Prisionero";

/**
 * Alumna: Eylin Medina
 * Cédula: 32.593.949
 * Estrategia: "Umbral de Tolerancia por Acumulación"
 * * Lógica:
 * 1. BANDERA: Alianza con equipo femenino (#equipoFemenino).
 * 2. ACUMULADOR: Puntos de paciencia que suben y bajan (#puntosDePaciencia).
 * 3. CONTADOR: Registro de rondas transcurridas (#contadorDeRondas).
 */
export class EylinMedina extends Prisionero {
    nota = 16;
    //no sigue las reglas de la guia
    // --- Atributos Privados (POO Moderna con #) --
    #contadorDeRondas: number = 0;    // CONTADOR
    #puntosDePaciencia: number = 10;  // ACUMULADOR 
    #equipoFemenino: string[];        // BANDERA 

    constructor() {
        super();
        this.nombre = 'Eylin Medina';
        // Punto de trabajo en equipo: Alianza con sus compañeras
        this.#equipoFemenino = ["Elienny Martinez", "Fabiola Sanchez", "Valeria Gil"];
    }

    /**
     * DECISIÓN: Determina si confiesa o no basándose en el estado de su paciencia.
     */
    public override confesar(): boolean {
        // Validación de seguridad para no romper el juego
        if (!this.complice) return false;
        
        const nombreSocio = this.complice.nombre;

        // 1. Verificación de Alianza (Prioridad alta)
        if (this.#equipoFemenino.some(amiga => nombreSocio.includes(amiga))) {
            return false; // Lealtad total a las aliadas
        }

        // 2. Lógica de Decisión (Umbral de seguridad)
        // Confiesa solo si la paciencia es crítica (menor a 3) y no es la primera ronda.
        if (this.#puntosDePaciencia < 3 && this.#contadorDeRondas > 0) {
            return true; // Autodefensa por agotamiento de confianza
        }

        return false;
    }

    /**
     * MEMORIA: Actualiza los puntos de paciencia y contadores una sola vez por ronda.
     */
    public recordar(oponenteConfeso?: boolean): void {
        if (oponenteConfeso === undefined) return;

        this.#contadorDeRondas++; // Incrementa CONTADOR

        if (oponenteConfeso) {
            // Si el oponente confiesa (traición), restamos paciencia
            this.#puntosDePaciencia -= 3;
        } else {
            // Si coopera, recuperamos paciencia poco a poco (límite 10)
            if (this.#puntosDePaciencia < 10) {
                this.#puntosDePaciencia += 1;
            }
        }
    }

    /**
     * JUICIO: Ejecuta la lógica original del profesor y dispara la actualización de memoria.
     */
    public override juicio(condena: number): void {
        // EJECUTAR FUNCIÓN ORIGINAL DEL PADRE (Obligatorio para no romper el juego)
        super.juicio(condena);
        
        /**
         * Deducimos si el oponente confesó basándonos en la tabla de la guía:
         * 3 años: Ambos confiesan.
         * 10 años: Tú niegas y el otro confiesa.
         */
        const oponenteTraiciono = (condena === 3 || condena === 10);
        
        // Ejecutamos la actualización de nuestros atributos privados
        this.recordar(oponenteTraiciono);
    }
}