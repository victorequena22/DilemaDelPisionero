import { Prisionero } from "../Prototipos/Prisionero";

// Este prisionero implementa la estrategia "Impulsivo", 
// donde la decisión de confesar depende de la frecuencia de confesiones (traiciones) de su cómplice.
// Si su cómplice ha traicionado frecuentemente, este prisionero tenderá a confesar con mayor probabilidad;
// de lo contrario, preferirá cooperar.
export class Impulsivo extends Prisionero {
    constructor() {
        super();
        this.setNombre('Impulsivo');
    }

    confesar() {
        const historial = this.getHistorial(this.getComplice().getNombre());
        
        // En la primera ronda, opta por cooperar (no confiesa)
        if (historial.length === 0) {
            return false;
        }
        
        // Calcula la proporción de veces que su cómplice ha confesado
        const traiciones = historial.filter(accion => accion === true).length;
        const proporcion = traiciones / historial.length;
        
        // Decide confesar con una probabilidad igual a la proporción de traiciones observadas.
        // Por ejemplo, si el cómplice ha confesado el 70% de las veces, este prisionero confesará con un 70% de probabilidad.
        return Math.random() < proporcion;
    }
}
