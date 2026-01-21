import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

// Alumno: Daniela Brito
// CI: 32.224.125
// Estrategia: Mi prisionero utiliza un análisis combinado. 
// Durante las primeras 4 rondas aplica un "Cebo" cooperando para fomentar el beneficio mutuo. 
// Simultáneamente, consulta al Interrogador para calcular la tendencia global del cómplice.
// Si la hostilidad local supera el 25% o la global el 40%, se activa el Modo Centinela (defensivo). 
// Para evitar ciclos de traición infinita, incluye un mecanismo de Perdón si el oponente coopera 3 veces seguidas. 
// Además, optimiza la sentencia mediante una Explotación Oportunista cada 7 turnos contra oponentes extremadamente confiables.
// Cuando enfrenta a Jesus Cruz o a Albany Jimenez, utiliza una bandera para adoptar una estrategia fija de traición o cooperación respectivamente.
export class DanielaBrito extends Prisionero {
    nota = 3;
    // No sigue las reglas de las guias
    // No se permiten porcentagues directos
    constructor() {
        super();
        this.nombre = "Daniela Brito";
    }

    private _modo_centinela: boolean = false;
    private _contador: number = 0;
    private _acumulador: number = 0;
    private _promedio: number = 0;
    private obtener_tendencia_global(nombre_c: string): number {
        const int = this.interrogador as any;
        let h: boolean[] = [];

        // Verificamos dinámicamente dónde guarda el historial este interrogador
        if (typeof int.getHistorial === 'function') h = int.getHistorial(nombre_c);
        else if (int.Historial1 && int.Prisionero1?.nombre === nombre_c) h = int.Historial1;
        else if (int.Historial2 && int.Prisionero2?.nombre === nombre_c) h = int.Historial2;
        else if (int.Historial && int.Historial[nombre_c]) h = int.Historial[nombre_c];

        if (!h || h.length === 0) return 0;
        const ultimas = h.slice(-5);
        return ultimas.filter(v => v === true).length / ultimas.length;
    }
    public confesar(): boolean {
        const nombre_c = this.complice.nombre;
        // 1. RECOPILACIÓN DE DATOS
        // Accedemos al historial específico contra este cómplice.
        const historial_local = (this.historial as any)[nombre_c] || [];

        // 2. ACTUALIZACIÓN DE MÉTRICAS 
        this._contador = historial_local.length;
        this._acumulador = historial_local.filter((v: boolean) => v === true).length;
        this._promedio = this._contador > 0 ? this._acumulador / this._contador : 0;

        // 3. IDENTIFICACIÓN DE OPONENTES (Estrategias fijas con bandera)
        if (nombre_c === "Albany Jimenez") return false;
        if (nombre_c === "Jesus Cruz") return true;

        // 4. LÓGICA DE CEBO (Primeras rondas para ganar confianza)
        if (this._contador < 4) return false;

        // 5. EVALUACIÓN DE RIESGO (Local y Global)
        const tendencia_global = this.obtener_tendencia_global(nombre_c);
        if (this._promedio > 0.25 || tendencia_global > 0.4) {
            this._modo_centinela = true;
        }

        // 6. CONTROL DEL MODO CENTINELA (Defensa y Perdón)
        if (this._modo_centinela) {
            const paz = historial_local.slice(-4);
            if (paz.length === 4 && paz.every((v: boolean) => v === false)) {
                this._modo_centinela = false;
                return false;
            }
            return true; // Confesar para protegerse
        }

        // 7. EXPLOTACIÓN (Si el otro es muy bueno, sacamos ventaja cada 7 turnos)
        if (this._promedio < 0.05 && this._contador % 7 === 0) {
            return true;
        }

        return false;
    }
}