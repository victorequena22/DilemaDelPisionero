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
    #ConfesionesSeguidas = 0


    constructor() {
        super();
        this.setNombre('Alaina Medina')
    }

    registrarCooperacion() {
        this.#VecesTraicionadoConsecutivas = 0;
        this.#Confesion = false;
        this.#VecesQueTraicione = 0;
        this.#Perdones ++;
        this.#ConfesionesSeguidas = 0;
    }
    confesar(): boolean {

        const nombreComplice = this.getComplice().getNombre();
        const historial = this.getHistorial(nombreComplice) || [];
        const vecesTraicionado = historial.filter(respuesta => respuesta === true).length;
        const vecesQueCoopero = historial.filter(respuesta => respuesta === false);
        const ultimasCooperaciones = vecesQueCoopero.slice(-2);

        // si la han traicionado igual o mas de dos veces y si ella ha traicionado menos de tres veces.
        if (vecesTraicionado >= 2 && this.#VecesQueTraicione < 3) {/** condicion lio */
            this.#VecesQueTraicione++;
            this.#ConfesionesSeguidas++;

            // si ha traicionado menos de tres veces seguidas.
            if (this.#ConfesionesSeguidas < 3) {

                // Traiciona, si el complice confieza.
                if (ultimasCooperaciones.length === 0) {
                    return true

                }

                // Coopera, si el complice coopera.
                if (ultimasCooperaciones.length !== 0) {
                    this.registrarCooperacion()
                    return false

                }
            }
        }
        //Si no se cumplen las condiciones para confesar o traicionar,
        //  la función devuelve false, es decir, no confiesa.
        this.#ConfesionesSeguidas = 0
        
        /***************************************************************/
        /** Si reinicias el contador todo el tiempo nunca entrara el   */
        /* la condicion lio tiene que llevar las cuentas sin reiniciar */
        /* todo el tiempo ahora es el problema contrario               */
        /***************************************************************/
        this.registrarCooperacion()
        return false
    }
}