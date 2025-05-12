import { InterrogadorInterface, JuezInterface } from "./interface";
import { Persona } from "./Persona";


export class Juez extends Persona implements JuezInterface {
    #interrogador: InterrogadorInterface
    //overwrite
    getNombre() {
        return 'Juez ' + super.getNombre();
    };
    setInterrogador(interrogador: InterrogadorInterface) {
        this.#interrogador = interrogador;
    };
    juicio() {
        var confecion1 = this.#interrogador.getRespuesta1();
        var confecion2 = this.#interrogador.getRespuesta2();
        var prisionero1 = this.#interrogador.getPrisionero1();
        var prisionero2 = this.#interrogador.getPrisionero2();
        this.getHistorial(prisionero1.getNombre()).push(confecion1);
        this.getHistorial(prisionero2.getNombre()).push(confecion2);
        if (confecion1 && confecion2) {
            prisionero1.juicio(5);
            prisionero2.juicio(5);
        } else if (!confecion1 && !confecion2) {
            prisionero1.juicio(3);
            prisionero2.juicio(3);
        } else if (confecion1 || confecion2) {
            if (confecion1) {
                prisionero2.juicio(10);
                prisionero1.juicio(0);
            } else {
                prisionero2.juicio(0);
                prisionero1.juicio(10);
            }
        }
    }

}