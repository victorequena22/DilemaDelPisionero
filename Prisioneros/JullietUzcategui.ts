

/*
Nombre : Juliet Uzcategui
Cedula : 31406825
Estrategia del prisionero:
Las 3 primeras rondas por cada complice colabora, despues analiza si el complice colabora
siempre o si traicionó 3 veces. Si alguna de esas dos se cumple entonces el estratega traiciona para obtener mejores resultados. 
Si no se cumple ninguna, el estratega aplica ojo por ojo.
*/

import { Prisionero } from "../Prototipos/Prisionero";

export class JullietUzcategui extends Prisionero {
    nota =20;
    #memoria_traiciones: Record<string, number>;
    #memoria_rondas: Record<string, number>;
    #lista_aliados: String[]
    constructor() {
        super();
        this.nombre = 'Julliet Uzcategui';
        // Variables contadoras
        this.#memoria_traiciones = {};
        this.#memoria_rondas = {};
        // Variable bandera
        this.#lista_aliados = ["Jesus Freitez, Anmary Gallardo"];
    }

    confesar() {
        let nombre_complice = this.complice.nombre;

        if (this.#lista_aliados.includes(nombre_complice)) {
            return false;
        }

        let historial = this.historial;

        if (this.#memoria_rondas[nombre_complice] == undefined) {
            this.#memoria_rondas[nombre_complice] = 0;
        }
        if (this.#memoria_traiciones[nombre_complice] == undefined) {
            this.#memoria_traiciones[nombre_complice] = 0;
        }

        this.#memoria_rondas[nombre_complice] += 1;

        if (historial[historial.length - 1]) {
            this.#memoria_traiciones[nombre_complice] += 1;
        }

        if (this.#memoria_rondas[nombre_complice] < 3) {
            return false;
        } else {
            if (this.#memoria_traiciones[nombre_complice] >= 3 || this.#memoria_traiciones[nombre_complice] == 0) {
                return true;
            }
            if (historial[historial.length - 1]) {
                return true;
            }
        }

        return false;

    }

}
