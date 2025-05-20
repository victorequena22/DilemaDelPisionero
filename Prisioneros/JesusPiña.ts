import { Prisionero } from "../Prototipos/Prisionero";
// Prisionero estratega adaptativo: Jesus Piña observa el historial completo de su cómplice.
// Coopera la primera vez. Si el cómplice lo traicionó en la ronda anterior, él traiciona la siguiente vez.
// Si el cómplice ha cooperado más veces que traicionado, coopera. Si ha traicionado más veces, traiciona.
// Si hay empate, copia la última jugada del cómplice. Busca minimizar su condena adaptándose al rival.
// CI: 31836101
export class JesusPiña extends Prisionero {
    constructor() {
        super();
        this.setNombre("Jesus Piña");
    }

    confesar(): boolean {
        const complice = this.getComplice();
        if (!complice) return false;
        const historial = this.getHistorial(complice.getNombre());
        if (historial.length === 0) {
            return false; // Coopera la primera vez
        }
        /************************************************************/
        /** Como es un valor booleano verdadero no es necesario     */
        /*  colocar el === true                                     */
        /************************************************************/
        // Si el cómplice traicionó en la ronda anterior
        if (historial[historial.length - 1] === true) {
            return true;
        }
        /************************************************************/
        /** Igual que arriba booleano verdadero no es necesario     */
        /*  colocar el === true                                     */
        /************************************************************/
        // Cuenta cooperaciones y traiciones
        const traiciones = historial.filter(x => x === true).length;
        /************************************************************/
        /** Igual que arriba booleano false puedes usar la negacion */
        /* (x => !x) para obtener el mismo resultado                */
        /************************************************************/
        const cooperaciones = historial.filter(x => x === false).length;
        /************************************************************/
        /** la sentencia if tiene su condicion para falso que es    */
        /* else ya que el segundo es el falso del primero se usa if */
        /* y else if para el segundo                                */
        /************************************************************/
        if (cooperaciones > traiciones) {
            return false;
        }
        /************************************************************/
        /** Debido a que la sigiente despues de este tambien es     */
        /* devuelve false si colocas esta antes te ahorras la       */
        /* anterior y la siguiente                                  */
        /************************************************************/
        if (traiciones > cooperaciones) {
            return true;
        }
        /************************************************************/
        /** si la accion anterior fue traicion(true) no llegara     */
        /* hasta aqui ya que se ejecutara el primer if en el metodo */
        /* por lo este siempre devuelve false                       */
        /************************************************************/
        // Si hay empate, copia la última jugada
        return historial[historial.length - 1];
    }
}