import { Prisionero } from "../Prototipos/Prisionero";

// Este prisionero funciona de la siguiente manera:
// Si lo traicionan dos veces seguidas, activa un modo de traición automática.
// Si su cómplice ha traicionado al menos 2 veces en total y el prisionero 
// no ha traicionado más de 3 veces, también traiciona.
// Si ya traiciono 3 veces, vuelve a cooperar.
// Si cooperan, se "resetea" y da otra oportunidad.
// Alaina Medina 31027740
export class AlainaMedina extends Prisionero {
    #VecesTraicionadoConsecutivas = 0;
    #VecesQueTraicione: number = 0;
    #Confesion = false;
    #Perdones = 0;

    constructor() {
        super();
        this.setNombre('Alaina Medina')
    }

    registrarCooperacion() {
        this.#VecesTraicionadoConsecutivas = 0;
        this.#Confesion = false;
        this.#VecesQueTraicione = 0;
        this.#Perdones ++;
    }
    confesar(): boolean {

        /***************************************************************/
        /** Esto invalida la condicion  que sigue despues              */
        /***************************************************************/
        if (this.#VecesQueTraicione >= 3) {
            /***************************************************************/
            /** Esta duncion no se esta ejecutando                         */
            /***************************************************************/
            this.registrarCooperacion
            return false
        }


        const nombreComplice = this.getComplice().getNombre();
        const historial = this.getHistorial(nombreComplice) || [];
        const vecesTraicionado = historial.filter(respuesta => respuesta === true).length;


        /***************************************************************/
        /** si le contador pasa VecesQueTraicione de 3 es quivalente a */
        /* la condicion del principo                                   */
        /***************************************************************/
        if (vecesTraicionado >= 2 && this.#VecesQueTraicione < 3) {
            this.#VecesQueTraicione++;
            return true;
        }

        return false

    }
}

/***************************************************************/
/** sigue teniendo el mismo problema de traicionar un maximo   */
/* 3 veces en todo el juego                                    */
/***************************************************************/