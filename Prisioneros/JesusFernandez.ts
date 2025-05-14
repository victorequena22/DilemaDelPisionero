import { Prisionero } from "../Prototipos/Prisionero";

/*este prsionero va tomando la deciciones de si confezar o no comparando la 
cantidad de veces que a sido traicionado y cunatas veces no a  traicionado*/
//CI:33.091.874
export class JesusFernandez extends Prisionero {

    /***************************************************************/
    /** Esto esta correcto pero no tiene el # para ponerlo privado */
    /** aunque el lengueje permite colocar private en la sintaxis  */
    /** lo que determina si es privada es el # al pricipio         */
    /***************************************************************/
    private traiciones: number;
    private noTraiciones: number;

    constructor() {
        super();
        this.setNombre('Jesus Fernandez');
        this.traiciones = 0;
        this.noTraiciones = 0;
    }

    confesar() {
        const complice = this.getComplice();
        if (!complice) return false;

        const nombre = complice.getNombre();
        /***************************************************************/
        /** Esto ya devuelve el historial del complice y no el objeto  */
        /** con todos los historiales toma eso en cuenta para corregir */
        /** tu codigo                                                  */
        /***************************************************************/
        const historial = this.getHistorial(this.getComplice().getNombre())

        /***************************************************************/
        /** Corrige el punto anterior para saltarte esta validacion    */
        /***************************************************************/
        //estas validando si hay un array con ese nombre en la lista
        if (historial[nombre] === undefined) {

            /***************************************************************/
            /** Estas creando un array nuevo que no estas usando           */
            /***************************************************************/
            historial[nombre] = [];
            return false;
        } else {

            /***************************************************************/
            /** Esto siempre sera undefined ya que en ningun lugar estas   */
            /** guardando los valores en el nuevo array                    */
            /***************************************************************/
            const ultimaAccion = historial[nombre][historial[nombre].length - 1];


            /***************************************************************/
            /** undefined simpre lo toma como false                        */
            /***************************************************************/
            if (ultimaAccion) {
                this.traiciones++;
            } else {
                this.noTraiciones++;
            }


            /***************************************************************/
            /** como el atriburo traiciones no aumenta este siempre sera   */
            /** menor al atriburo noTraiciones lo que hace que siempre     */
            /** debuelva true                                              */
            /***************************************************************/
            if (this.traiciones > this.noTraiciones) {
                return false;
            } else if (this.traiciones < this.noTraiciones) {
                return true;
            } else {

                return ultimaAccion;
            }
        }

    }
}
