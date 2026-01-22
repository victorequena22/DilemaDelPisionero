import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Saul Perez
// C.I: V-14.031.695
// 1. Inicia cooperando (false) para establecer confianza.
// 2. Utiliza una Estructura Acumulador para contar cuantas veces ha cooperado el rival.
// 3. Basado en ese acumulador, define un limite de "Perdones" usando una bandera.
// 4. Si el oponente traiciona, se evalua si aun quedan perdones disponibles segun el historial.

export class Saulperez extends Prisionero {
    nota = 0;
    // No sigue las reglas de las guias
    // Una ves gastados los perdones quedas en honesto al ser numeros fijos no hay forma de que sea viable a largo plazo
    // Atributos privados 
    private perdonesUsados: number = 0;
    private cooperacionesRecibidas: number = 0;

    constructor() {
        super(); 
        this.nombre = "Saul Perez";
    }

    public confesar(): boolean {
        const miHistorial = this.historial; 
        
        // JUGADA 1: Cooperar (Estructura de inicio)
        if (miHistorial.length === 0) {
            return false;
        }
        
        // 2. ACTUALIZACION (Estructura Acumulador)
        const ultimaRespuesta = miHistorial[miHistorial.length - 1];
        if (ultimaRespuesta === false) {
            this.cooperacionesRecibidas++;
            return false; // Si el otro cooperó, yo también coopero
        }

        // 3. PERDON ( atribuye niveles de confianza)
        if (this.evaluarPerdon()) {
            this.perdonesUsados++;
            return false; // Perdonar (Cooperar ante traición)
        }

        return true; // Traicionar si se agotaron los perdones
    }
    
    
    private evaluarPerdon(): boolean {
        let limitePerdones: number;
        
        // Estructura de decisión basada en cantidad de cooperaciones acumuladas
        if (this.cooperacionesRecibidas > 10) {
            limitePerdones = 3;
        } else if (this.cooperacionesRecibidas > 5) {
            limitePerdones = 2;
        } else {
            limitePerdones = 1;
        }
        
        return this.perdonesUsados < limitePerdones;
    }
}
