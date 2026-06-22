import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

// Nombre: Jean Cordero
// Cédula: 32022714
// Estrategia: FSM Tit-for-Tat con Máquina de Estados Dinámica
// - Primera ronda: coopera.
// - Modula su comportamiento según un sistema de estados anímicos.
// - Implementa análisis de tendencias globales y rupturas de bucles cíclicos.

type EstadoAnimo = "CALMADO" | "ALERTA" | "REPRESALIA_TOTAL";
/** Solo se permiten 2 estrategias maximo */
/** Ya lo implemento Gabriel Guillen */
export class Jean_Cordero extends Prisionero {
    nota: number = 20;

    private traicionesConsecutivas: number = 0;
    private nivelAlerta: number = 0;
    private estadoActual: EstadoAnimo = "CALMADO";

    constructor() {
        super();
        this.nombre = 'Jean Cordero';
    }

    confesar(_i: Interrogador): boolean {
        let historial: boolean[] = this.historial;
        let ronda: number = historial.length;

        // Primera ronda: cooperar por defecto
        if (ronda === 0) {
            return false;
        }

        let ultimaAccionRival: boolean = historial[ronda - 1];

        // 1. Evaluación reactiva del último movimiento
        if (ultimaAccionRival === false) {
            this.traicionesConsecutivas = 0;
            this.nivelAlerta = Math.max(0, this.nivelAlerta - 1);
        } else {
            this.traicionesConsecutivas = this.traicionesConsecutivas + 1;
            this.nivelAlerta = this.traicionesConsecutivas >= 2 ? this.nivelAlerta + 2 : this.nivelAlerta + 1;
        }

        // 2. Mapeo de tendencias globales en el historial
        let traiciones: number = historial.filter((accion: boolean) => accion === true).length;
        let cooperaciones: number = ronda - traiciones;

        // 3. Transición de la Máquina de Estados Finitos
        if (ronda >= 2 && historial[ronda - 1] === true && historial[ronda - 2] === true) {
            this.estadoActual = "REPRESALIA_TOTAL";
        } else if (this.nivelAlerta > 1) {
            this.estadoActual = "ALERTA";
        }

        // Criterio de mitigación de riesgo (perdón condicional)
        if (cooperaciones > traiciones) {
            this.estadoActual = "CALMADO";
            this.nivelAlerta = Math.max(0, this.nivelAlerta - 1);
            this.traicionesConsecutivas = Math.max(0, this.traicionesConsecutivas - 1);
        }

        // 4. Determinación de la decisión base según el estado actual
        let decision: boolean = false;
        
        if (this.estadoActual === "REPRESALIA_TOTAL") {
            decision = true;
        } else if (this.estadoActual === "ALERTA") {
            decision = traiciones > cooperaciones;
        } else {
            decision = ultimaAccionRival;
        }

        // 5. Factores de impredecibilidad y mitigación de bucles algorítmicos
        let azar: number = Math.random();

        // Evento de cooperación extrema bajo condiciones de alta confianza
        if (ronda > 10 && cooperaciones > traiciones * 2 && azar < 0.005) {
            return false;
        }

        // Margen de ruido estocástico (10%)
        if (azar < 0.1) {
            decision = !decision;
        }
        // Variación cíclica controlada para desestabilizar respuestas espejo
        else if (ronda % 6 === 0 && ronda % 4 !== 0) {
            decision = !decision;
        }

        return decision;
    }
}