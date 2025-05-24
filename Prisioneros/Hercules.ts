import { PrisioneroInterface } from "../Prototipos/interface";
import { InterrogadorInterface } from "../Prototipos/interface";
import { Prisionero } from "../Prototipos/Prisionero";
/*Hercules coopera inicialmente. Una vez suficiente informacion es recolectada, se coloca en un estado de
discernimiento ante sus contrincantes, de los cuales obtendra informacion sobre sus otros contrincantes, 
comparandola a la manera en que se han comportado cuando estan con el. Finalmente, en base a estos datos
el otorgara una respuesta a la confesion actual acorde a como el complice ha actuado con otros. Los casos son:

+Si otros dicen que el complice los ha traicionado mas veces que cooperado, se verifica si ellos mismos le han
cooperado a Hercules mas veces que traicionado:
    -Si han cooperado mas veces que traicionado con Hercules, se considera traicionar al complice
    -Si han traicionado mas veces que cooperado con Hercules, se considera cooperar con el complice
+Si otros dicen que el complice les ha cooperado mas veces que traicionado, se verifica si ellos mismos le han
traicionado a Hercules mas veces que cooperado:
    -Si han cooperado mas veces que traicionado con Hercules, se considera en cooperar con el complice
    -Si han traicionado mas veces que cooperado con Hercules, se considera traicionar al complice
Finalmente, se suman estos datos de cada contrincante anterior para tomar una decision unanime.
CI: 31987430
*/

export class Hercules extends Prisionero {
    /*******************************************************************/
    /** Se te olvido poner el Apellido                                 */
    /** se te olvido poner privados los metodos getHistorialTomado     */
    /* y getHistorialIntuido                                           */
    /*******************************************************************/
    nota = 13;
    #todos_complices: string[] = [];
    #historial_intuido: Record<string, any> = {};

    constructor() {
        super();
        this.setNombre("Heracles Sánchez");
    }
    getHistorialTomado(nombre: string, arreglo: Record<string, any>) {
        if (arreglo[nombre] === undefined) {
            arreglo[nombre] = [];
        }
        return arreglo[nombre];
    }
    getHistorialIntuido(nombre: string, subnombre: string) {
        if (!this.#historial_intuido[nombre]) {
            this.#historial_intuido[nombre] = {};
        }
        if (nombre != subnombre) {
            if (!this.#historial_intuido[nombre][subnombre]) {
                this.#historial_intuido[nombre][subnombre] = [];
            }
        }
        return this.#historial_intuido[nombre][subnombre];
    }
    #grabarNombre() {
        var nombre_comp: string = this.getComplice().getNombre();
        if (!this.#todos_complices.includes(nombre_comp)) {
            this.#todos_complices.push(nombre_comp);
        }
        return nombre_comp;
    }
    #filtrarHistorial() {
        var mi_complice: PrisioneroInterface = this.getComplice();
        this.#todos_complices.forEach(contrincante => {
            if (mi_complice.getNombre() != contrincante) {
                if (mi_complice.getHistorial(contrincante).length != 0) {
                    this.getHistorialIntuido(mi_complice.getNombre(), contrincante).length = 0;
                    mi_complice.getHistorial(contrincante).forEach(booleano => {
                        this.getHistorialIntuido(mi_complice.getNombre(), contrincante).push(booleano);
                    });
                }
            }
        });
    }
    confesar() {
        if (this.getComplice().getNombre() == this.getNombre()) {
            return false;
        }
        var nombre_comp: string = this.#grabarNombre();
        this.#filtrarHistorial();
        var fiabilidad: number = 0;
        var cant_casos: number = 0;
        this.#todos_complices.forEach(chismoso => {
            if (chismoso != nombre_comp) {
                var chismoso_cooperas: number = this.getHistorial(chismoso).filter(conf => conf == true).length;
                var chismoso_traiciones: number = this.getHistorial(chismoso).filter(conf => conf == false).length;
                var traiciones_rumor: number = this.getHistorialIntuido(chismoso, nombre_comp).filter(conf => conf == true).length;
                var coopera_rumor: number = this.getHistorialIntuido(chismoso, nombre_comp).filter(conf => conf == false).length;
                if (chismoso_cooperas != 0 || chismoso_traiciones != 0) {
                    if ((chismoso_cooperas >= chismoso_traiciones)) {
                        fiabilidad = fiabilidad + Number(coopera_rumor >= traiciones_rumor);
                        cant_casos += 1;
                    }
                    else {
                        fiabilidad = fiabilidad + Number(coopera_rumor < traiciones_rumor);
                        cant_casos += 1;
                    }
                }
            }
        });

        return (fiabilidad > cant_casos / 2);
    }
}
