import { Prisionero } from "../Prototipos/Prisionero";
/*
ALUMNO: DIEGO BUSTAMANTE
CEDULA: 32057588
ESTRATREGIA DEL PRISIONERO:
Este prisionero actua en base a su arrecherra. 
Cada vez que lo traicionan gana 2 puntos de arrecherra.
Y cada vez que el traiciona disminuye 1 punto de arrecherra.
Por ultimo mantiene una lista de aliados que toma en cuenta siempre y cuando su arrechera no supere el limite de 6 puntos.
*/
export class DiegoBustamante extends Prisionero {
    #lista_aliados: string[];
    #arrecherra: number;
    nota = 20;
    constructor() {
        super();
        this.nombre = 'Diego Bustamante';
        this.#lista_aliados = [ "Jesus Cruz" , "Albany Jimenez", "Anmary Gallardo", "Jose Gonzalez"];//Bandera
        this.#arrecherra = 0;
    }
    confesar() {
        let nombre_complice = this.complice.nombre;
        let historial_complice = this.historial;
        if (historial_complice[historial_complice.length - 1]) {
            this.#arrecherra += 2;
        }
        if (this.#arrecherra < 6) {
            if (this.#lista_aliados.includes(nombre_complice)) {
                return false;
            }
        }
        if (this.#arrecherra > 0) {
            this.#arrecherra -= 1;
            return true;
        }
        return false;
    }
}