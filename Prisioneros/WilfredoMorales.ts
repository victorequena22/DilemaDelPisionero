import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Wilfredo Morales
// Cedula: 15.176.033
// Estrategia: "Calculador Implacable". 
// Utiliza una Estructura Selectiva basada en una ventana de observacion 
// de los ultimos 5 encuentros. Si detecta deslealtad en este periodo, 
// prioriza la defensa propia para evitar la condena maxima.

export class WilfredoMorales extends Prisionero {
    nota = 20;
    // ley del espejo solo puede salir false ya que si la ultima accion es true cae en Implacable
    constructor() {
        super(); 
        this.nombre = 'Wilfredo Morales';
    }

    public confesar(): boolean {
        const h = this.historial;
        const n = h.length;

        // Construye Confianza
        if (n === 0) return false;

        // Analiza Hostilidad :
        const historialReciente = h.slice(-5);
        
        // Decision : Si hay una traicion, se confiesa (Implacable).
        if (historialReciente.includes(true)) {
            return true; 
        }

        // Ley del espejo si no hay agresion detectada.
        return h[n - 1];
    }
}
