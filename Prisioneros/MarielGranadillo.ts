import { Prisionero } from "../Prototipos/Prisionero";
// nombre : Mariel Granadillo
// cedula : 32052982
// estrategia :
// el prisionero guarda la sentencia y el nombre del complice
// luego, si el nombre esta en su lista blanca, decide no traicionar
// pero si el prisionero no esta en la lista blanca, decide traicionar 
// si la sentencia del complice es mayor que la suya
// si no tiene mayor sentencia, entonces no traiciona
export class MarielGranadillo extends Prisionero {
    nota: number = 20;
    #lista_blanca: string[]
    constructor() {
        super();
        this.nombre = 'Mariel Granadillo';
        // variable bandera para decidir a quien no traicionar nunca
        this.#lista_blanca = ["Anmary Gallardo"];
    }
    confesar() {
        let sentencia_complice = this.complice.sentencia;
        let nombre_complice = this.complice.nombre;

        if (this.#lista_blanca.includes(nombre_complice))
            return false

        if (sentencia_complice < this.sentencia)
            return true;

        return false;
    }
}