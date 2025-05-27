import { Prisionero } from "../../Prototipos/Prisionero";
import { PrisioneroInterface } from "../../Prototipos/interface";

// Este prisionero coopera la primera ronda, si el complice lo traciona el coopera por 2 rondas
// y si el complice coopera e traiciona por 2 rondas
// Frankie Sanchez C.I: 32.527.670
export class FrankieSanchez extends Prisionero implements PrisioneroInterface {
    /*******************************************************************/
    /** Se te olvido poner privados los Atributos                      */
    /** Se te olvido poner privados el metodo getUltimaAccionComplice  */
    /*******************************************************************/
    nota = 12;

    private numeroRonda: number = 0;
    private rondasPendientesDeAccion: number = 0;
    private accionActualPendiente: boolean | null = null;

    constructor(nombre: string = "Frankie Sanchez") {
        super();
        this.setNombre(nombre);
    }

    private getUltimaAccionComplice(): boolean | undefined {
        if (!this.getComplice()) {
            return undefined;
        }
        const historial = this.getHistorial(this.getComplice().getNombre());
        if (historial && historial.length > 0) {
            return historial[historial.length - 1];
        }
        return undefined;
    }

    confesar(): boolean {
        this.numeroRonda++;

        if (this.numeroRonda === 1) {
            this.rondasPendientesDeAccion = 0;
            this.accionActualPendiente = null;
            return true;
        }

        if (this.rondasPendientesDeAccion > 0 && this.accionActualPendiente !== null) {
            this.rondasPendientesDeAccion--;
            return this.accionActualPendiente;
        }

        const accionCompliceAnterior = this.getUltimaAccionComplice();

        if (accionCompliceAnterior === undefined) {
            return true;
        }

        if (accionCompliceAnterior === false) {
            this.accionActualPendiente = true;
            this.rondasPendientesDeAccion = 2;
        } else {
            this.accionActualPendiente = false;
            this.rondasPendientesDeAccion = 2;
        }

        this.rondasPendientesDeAccion--;
        return this.accionActualPendiente;
    }
}