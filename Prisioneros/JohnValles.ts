import { InterrogadorInterface, PrisioneroInterface } from "../Prototipos/interface";
import { Prisionero } from "../Prototipos/Prisionero";

// Estrategia única de John Valles:
// - Coopera siempre en la primera ronda.
// - Alterna entre cooperar y traicionar en la segunda y tercera ronda.
// - A partir de la cuarta ronda:
//   - Coopera si el cómplice ha cooperado más veces.
//   - Traiciona si el cómplice ha traicionado más veces.
//   - Si hay empate, analiza el historial propio para decidir.
//   - Si el historial propio también está empatado, decide de forma aleatoria.
// CI: 31131987

export class JohnValles extends Prisionero {
    nota = 15;
    constructor() {
        super();
        this.setNombre("John Valles");
    }

    confesar(interrogador: PrisioneroInterface | InterrogadorInterface): boolean {
        // Obtener el historial del cómplice y del propio prisionero desde el interrogador
        const historialComplice = interrogador.getHistorial(this.getComplice().getNombre());
        const historialPropio = interrogador.getHistorial(this.getNombre());
        const rondaActual = historialComplice.length;

        // Primera ronda: Coopera siempre
        if (rondaActual === 0) {
            return false;
        }

        // Segunda y tercera ronda: Alterna entre cooperar y traicionar
        if (rondaActual === 1 || rondaActual === 2) {
            return rondaActual % 2 === 0; // Coopera en ronda par, traiciona en impar
        }

        // A partir de la cuarta ronda, analiza el historial del cómplice y el propio
        const vecesCooperadoComplice = historialComplice.filter((decision: boolean) => !decision).length;
        const vecesTraicionadoComplice = historialComplice.filter((decision: boolean) => decision).length;

        /************************************************************/
        /** A partir de la 4 ronda funciona diferente al de Sara Ramos */
        /* Intercala entre usar el historial del cómplice y el propio  */
        /* dependiendo de si la ronda es par o impar                  */
        /************************************************************/
        if (rondaActual % 2 === 0) {
            // Rondas pares: Usa el historial del cómplice
            if (vecesCooperadoComplice > vecesTraicionadoComplice) {
                return false; // Coopera
            } else if (vecesTraicionadoComplice > vecesCooperadoComplice) {
                return true; // Traiciona
            }
        } else {
            // Rondas impares: Usa el historial propio
            const vecesCooperadoPropio = historialPropio.filter((decision: boolean) => !decision).length;
            const vecesTraicionadoPropio = historialPropio.filter((decision: boolean) => decision).length;

            if (vecesCooperadoPropio > vecesTraicionadoPropio) {
                return false; // Coopera
            } else if (vecesTraicionadoPropio > vecesCooperadoPropio) {
                return true; // Traiciona
            }
        }

        // Si ambos historiales están empatados, decide de forma aleatoria
        return Math.random() < 0.5;
    }
}