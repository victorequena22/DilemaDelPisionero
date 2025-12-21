import { Persona } from "./Persona";
import { Prisionero } from "./Prisionero";

export class Interrogador extends Persona {
    #historial: Record<string, boolean[]> = {};
    #prisionero1!: Prisionero;
    #prisionero2!: Prisionero;
    #respuesta1!: boolean;
    #respuesta2!: boolean;
    interrogatorio(prisionero1: Prisionero, prisionero2: Prisionero) {
        this.#prisionero1 = prisionero1;
        this.#prisionero2 = prisionero2;
        this.#respuesta1 = this.#prisionero1.confesar(this);
        this.#respuesta2 = this.#prisionero2.confesar(this);
        this.Historial1.push(this.#respuesta1);
        this.Historial2.push(this.#respuesta2);
    }
    get Historial1() {
        if(this.#historial[this.#prisionero1.nombre] === undefined){
            this.#historial[this.#prisionero1.nombre] = [];
        }
        return this.#historial[this.#prisionero1.nombre];
    }
    get Historial2() {
        if(this.#historial[this.#prisionero2.nombre] === undefined){
            this.#historial[this.#prisionero2.nombre] = [];
        }
        return this.#historial[this.#prisionero2.nombre];
    }
    //overwrite
    get nombre() {
        return 'Interrogador ' + super.nombre;
    };
    get prisionero1() {
        return this.#prisionero1;
    }
    get prisionero2() {
        return this.#prisionero2;
    }
    get respuesta1() {
        return this.#respuesta1;
    }
    get respuesta2() {
        return this.#respuesta2;
    }
    set prisionero1(prisionero: Prisionero) {
        this.#prisionero1 = prisionero;
    }
    set prisionero2(prisionero: Prisionero) {
        this.#prisionero2 = prisionero;
    }
    set respuesta1(respuesta: boolean) {
        this.#respuesta1 = respuesta;
    }
    set respuesta2(respuesta: boolean) {
        this.#respuesta2 = respuesta;
    }
    set Historial1(historial: boolean[]) {
        this.#historial[this.#prisionero1.nombre] = historial;
    }
    set Historial2(historial: boolean[]) {
        this.#historial[this.#prisionero2.nombre] = historial;
    }
    set nombre(nombre: string) {
        super.nombre = nombre;
    };
}