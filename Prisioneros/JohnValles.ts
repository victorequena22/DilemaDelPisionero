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

/************************************************************/
/** Se parece demasiado al de sara ramos                    */
/************************************************************/
export class JohnValles extends Prisionero {
    constructor() {
        super();
        this.setNombre("John Valles");
    }

    /************************************************************/
    /** El interrogador entra por parametro en confesar         */
    /************************************************************/
    //confesar(interrogador:InterrogadorI){
    confesar(): boolean {
        const historialComplice = this.getHistorial(this.getComplice().getNombre());
        /************************************************************/
        /** El prisionero no lleva un historial propio se lo tienes */
        /* que pedir al coplice o al interrogador                   */
        /************************************************************/
        //este te devuelve el historial completo independientemente del complice
        //tambien puedes pedirle en historial de tu complice
        //     interrogador.getHistorial(this.getNombre())
        //este te devuelve el historial de interacciones con el complice
        //     this.getComplice().getHistorial(this.getNombre())
        const historialPropio = this.getHistorial(this.getNombre());
        const rondaActual = historialComplice.length;

        // Primera ronda: Coopera siempre
        if (rondaActual === 0) {
            return false;
        }

        // Segunda y tercera ronda: Alterna entre cooperar y traicionar
        if (rondaActual === 1 || rondaActual === 2) {
            return rondaActual % 2 === 0; // Coopera en ronda par, traiciona en impar
        }

        // A partir de la cuarta ronda, analiza el historial del cómplice
        const vecesCooperadoComplice = historialComplice.filter(decision => !decision).length;
        const vecesTraicionadoComplice = historialComplice.filter(decision => decision).length;

        /************************************************************/
        /** A partir de la 4 ronda funciona demaciado parecido al   */
        /* de sara ramos te recomiendo quites uno de los if para    */
        /* para que la mitad de las respuestas sean usando tu propio*/
        /* historial o intercales entre ambas usando modulo         */
        /************************************************************/
        if (vecesCooperadoComplice > vecesTraicionadoComplice) {
            return false; // Coopera
        } else if (vecesTraicionadoComplice > vecesCooperadoComplice) {
            return true; // Traiciona
        } else {
            // Si hay empate, analiza el historial propio
            const vecesCooperadoPropio = historialPropio.filter(decision => !decision).length;
            const vecesTraicionadoPropio = historialPropio.filter(decision => decision).length;

            if (vecesCooperadoPropio > vecesTraicionadoPropio) {
                return false; // Coopera
            } else if (vecesTraicionadoPropio > vecesCooperadoPropio) {
                return true; // Traiciona
            } else {
                // Si el historial propio también está empatado, decide de forma aleatoria
                return Math.random() < 0.5;
            }
        }
    }
}