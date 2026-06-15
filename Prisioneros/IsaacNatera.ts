import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Isaac Natera
// Cédula: 28595469
// Estrategia: Toma y Daca con perdón de 1 en 10
//
// Funcionamiento:
// - La primera ronda siempre coopera
// - Luego copia la última acción del cómplice.
// - Si el cómplice traicionó en la ronda anterior,
//   existe una posibilidad de 1 en 10
//   de perdonarlo y cooperar igualmente.
/** Ya lo implemento Wladimir Rivas */
export class IsaacNatera extends Prisionero {

    constructor() {
        super();
        this.nombre = "Isaac Natera";
    }

    override confesar(): boolean {
        const historial_complice = this.historial;

        // Primera ronda: cooperar
        if (historial_complice.length === 0) {
            return false;
        }

        const ultima_jugada = historial_complice[historial_complice.length - 1];

        // Si el cómplice cooperó, se coopera
        if (!ultima_jugada) {
            return false;
        }

        // Perdón de 1 en 10
        const numero = Math.random();
        /** No se permite porcentages directos */
        if (numero <= 0.10) {
            return false;
        }

        // Toma y daca: devolver la traición
        return true;
    }
}
