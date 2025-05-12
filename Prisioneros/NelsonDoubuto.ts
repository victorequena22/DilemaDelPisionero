import { Prisionero } from "../Prototipos/Prisionero";
// Ciclico
// Este prisionero sigue una estrategia cíclica: 
// en ronda par coopera (no confiesa) y en ronda impar confiesa.
// V32163215
export class NelsonDoubuto extends Prisionero {
    constructor() {
        super();
        this.setNombre('Nelson Doubuto');
    }

    confesar() {
        // Se utiliza el largo del historial del cómplice para determinar la ronda actual.
        const ronda = this.getHistorial(this.getComplice().getNombre()).length;
        // En la ronda 0 (primer turno) y en todas las rondas pares, coopera (false).
        // En las rondas impares, confiesa (true).
        return ronda % 2 === 1;
    }
}
