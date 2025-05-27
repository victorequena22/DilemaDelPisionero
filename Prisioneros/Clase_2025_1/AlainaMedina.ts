import { Prisionero } from "../../Prototipos/Prisionero";

// Este prisionero funciona de la siguiente manera:
// Si lo traicionan dos veces seguidas, activa un modo de traición automática.
// Si su cómplice ha traicionado al menos 2 veces en total y el prisionero 
// no ha traicionado más de 3 veces, también traiciona.
// Si ya traiciono 3 veces, vuelve a cooperar.
// Si cooperan, se "resetea" y da otra oportunidad.
// Alaina Medina 31027740
export class AlainaMedina extends Prisionero {
    #historialPorPrisionero: { [nombre: string]: { VecesTraicionado: number; VecesQueTraicione: number; ConfesionesSeguidas: number; Perdones: number } } = {};
    
    /*******************************************************************/
    /** se te olvido poner privados los metodos                        */
    /** el metodo ObtenerDatosDelPrisionero no sigue la norma de nombre*/
    /*******************************************************************/
    nota = 13;
    constructor() {
        super();
        this.setNombre('Alaina Medina')
    }

    ObtenerDatosDelPrisionero(nombre: string) {
        if (!this.#historialPorPrisionero[nombre]) {
            this.#historialPorPrisionero[nombre] = { VecesTraicionado: 0, VecesQueTraicione: 0, ConfesionesSeguidas: 0, Perdones: 0 };
        }
        return this.#historialPorPrisionero[nombre];
    }


    registrarCooperacion(nombreComplice: string) {
        const datos = this.ObtenerDatosDelPrisionero(nombreComplice);
        datos.VecesTraicionado = 0; // Reiniciamos solo si coopera
        datos.ConfesionesSeguidas = 0;
        datos.Perdones++;
    }

    confesar(): boolean {

        const nombreComplice = this.getComplice().getNombre();
        const historial = this.getHistorial(nombreComplice) || [];
        const vecesTraicionado = historial.filter(respuesta => respuesta === true).length;
        const vecesQueCoopero = historial.filter(respuesta => respuesta === false);
        const ultimasCooperaciones = vecesQueCoopero.slice(-2);

        const datos = this.ObtenerDatosDelPrisionero(nombreComplice);
        datos.VecesTraicionado = vecesTraicionado;

        //si la han traicionado igual o mas de dos veces por cada prisionero 
        // y si ella ha traicionado menos de tres veces 
        // o un número ajustado de veces basado en el total de interacciones.
        if (vecesTraicionado >= 2 && datos.VecesQueTraicione < Math.max(3, Math.floor(historial.length / 10))) {
            datos.VecesQueTraicione++;
            datos.ConfesionesSeguidas++;

            if (datos.ConfesionesSeguidas < 3 && ultimasCooperaciones.length === 0) {
                return true; // Traiciona si el cómplice ha confesado recientemente
            }
        }

        // Si el cómplice ha cooperado, reinicia el contador y coopera
        this.registrarCooperacion(nombreComplice);
        return false;
    }
}