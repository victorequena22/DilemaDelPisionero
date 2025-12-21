import { Interrogador } from "./Interrogador";
import { Persona } from "./Persona";


export class Juez extends Persona {
    #interrogador!: Interrogador
    #historial: Record<string, boolean[]> = {};
    //overwrite
    get nombre() { return 'Juez ' + super.nombre; };
    set nombre(nombre: string) { super.nombre = nombre; };
    get historial() { return this.#historial; }
    set interrogador(interrogador: Interrogador) { this.#interrogador = interrogador; };
    juicio() {
        var confecion1 = this.#interrogador.respuesta1;
        var confecion2 = this.#interrogador.respuesta2;
        var prisionero1 = this.#interrogador.prisionero1;
        var prisionero2 = this.#interrogador.prisionero2;
        this.Historial1.push(confecion1);
        this.Historial2.push(confecion2);
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
    get Historial1() {
        if(this.#historial[this.#interrogador.prisionero1.nombre] === undefined){
            this.#historial[this.#interrogador.prisionero1.nombre] = [];
        }
        return this.#historial[this.#interrogador.prisionero1.nombre];
    }
    get Historial2() {
        if(this.#historial[this.#interrogador.prisionero2.nombre] === undefined){
            this.#historial[this.#interrogador.prisionero2.nombre] = [];
        }
        return this.#historial[this.#interrogador.prisionero2.nombre];
    }

}