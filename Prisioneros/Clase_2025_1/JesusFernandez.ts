import { Prisionero } from "../../Prototipos/Prisionero";

/*este prsionero va tomando la deciciones de si confezar o no comparando la 
cantidad de veces que a sido traicionado y cunatas veces no a  traicionado*/
//CI:33.091.874
export class JesusFernandez extends Prisionero {

    /***************************************************************/
    /** No se aplicaron las correcciones                           */
    /** No funciona correctamente                                  */
    /***************************************************************/
    nota = 7;

    #traiciones: number;
    #noTraiciones: number;

    constructor() {
        super();
        this.setNombre('Jesus Fernandez');
        this.#traiciones = 0;
        this.#noTraiciones = 0;
    }

    confesar() {
        const complice = this.getComplice();
        if (!complice) return false;

        const nombre = complice.getNombre();
        /***************************************************************/
        /** Que estas haciendo guardando un metodo en una variable?    */
        /***************************************************************/
        const historial = this.getHistorial

        /***************************************************************/
        /** Como la variable que guardaste es un valor valid esto      */
        /** siempre va a pasar la verificacion                         */
        /** Haciendo que sea confiable por defecto                     */
        /***************************************************************/
        if (!historial) {

            return false;
        } else {


            const ultimaAccion = historial[nombre];


            if (ultimaAccion) {
                this.#traiciones++;
            } else {
                this.#noTraiciones++;
            }



            if (this.#traiciones > this.#noTraiciones) {
                return false;
            } else if (this.#traiciones < this.#noTraiciones) {
                return true;
            } else {

                return ultimaAccion;
            }
        }

    }
}
