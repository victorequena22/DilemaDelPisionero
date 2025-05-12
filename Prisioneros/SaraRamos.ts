import { Prisionero } from "../Prototipos/Prisionero";

/* observa primero la interacciones para tomar una decision, evalua los comportamientos del 
complice para ver que estrategia usar, 
si hay muchas confesiones cambia la estrategia y si el complice no ha  confesado coopera*/
//Sara Ramos 32023260
export class SaraRamos extends Prisionero {
    constructor() {
        super();
        this.setNombre("Sara Ramos");
    }


    confesar(): boolean {
        const nombre = this.getComplice().getNombre();
        const historial = this.getHistorial(nombre);

        const vecesConfesado = historial.filter(decision => decision).length;

        if (vecesConfesado >= historial.length / 2) {
            return true;
        }

        return false;
    }
}
