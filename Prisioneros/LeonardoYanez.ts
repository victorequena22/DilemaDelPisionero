import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Leonardo Yanez
// Cedula: 31.594.903
// Este prisionero no confieza siempre y cuando su compañero no confiese en dos ocasiones seguidas, y vuelve a no confesar luego que su complice decide no confesar, hasta que su complice vuelva a decidir confesar en dos rondas seguidas.

export class LeonardoYanez extends Prisionero {
    nota = 17;
    // Tu explicacion de la estrategia no se entiende 
    constructor() {
        super();
        this.nombre = 'Leonardo Yanez';
    }

    confesar() {

        // En las dos primeras rondas no confiesa. Retorna false

        if (this.historial.length < 2) {
            return false;
        }
        // Si en las dos ultimas rondas su compañero confiesa,  el confiesa. Retorna true

        return (this.historial[this.historial.length - 1] === true && this.historial[this.historial.length - 2] === true);

    }
}