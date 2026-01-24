import { Prisionero } from "../Prototipos/Prisionero";
//Nombre: Jose Gabriel Martinez Bisogno
//cedula: 32178820
// Estrategia: Coopera inicialmente, luego copia la última acción del compañero
export class JoseGabrielMartinez extends Prisionero {
    nota = 10;
    // Albany Jimenez ya tiene la estrategia
    constructor() {
        super();
        this.nombre = 'Jose Gabriel Martinez';
    }

    confesar() {
        // Si no hay historial, coopera (no confiesa)
        if (this.historial.length === 0) {
            return false;
        }
        // Copia la última acción del compañero
        return this.historial[this.historial.length - 1];
    }
}