import { InterrogadorInterface, PrisioneroInterface } from "./interface";
import { Persona } from "./Persona";

export class Interrogador extends Persona implements InterrogadorInterface {
    #prisionero1: PrisioneroInterface;
    #prisionero2: PrisioneroInterface;
    #respuesta1: boolean;
    #respuesta2: boolean;
    interrogatorio(prisionero1: PrisioneroInterface, prisionero2: PrisioneroInterface) {
        this.#prisionero1 = prisionero1;
        this.#prisionero2 = prisionero2;
        this.#respuesta1 = this.#prisionero1.confesar(this);
        this.#respuesta2 = this.#prisionero2.confesar(this);
        this.getHistorial(this.#prisionero1.getNombre()).push(this.#respuesta1);
        this.getHistorial(this.#prisionero2.getNombre()).push(this.#respuesta2);
    }
    //overwrite
    getNombre() {
        return 'Interrogador ' + super.getNombre();
    };
    getPrisionero1() {
        return this.#prisionero1;
    }
    getPrisionero2() {
        return this.#prisionero2;
    }
    getRespuesta1() {
        return this.#respuesta1;
    }
    getRespuesta2() {
        return this.#respuesta2;
    }
    setPrisionero1(prisionero: PrisioneroInterface) {
        this.#prisionero1 = prisionero;
    }
    setPrisionero2(prisionero: PrisioneroInterface) {
        this.#prisionero2 = prisionero;
    }
    setRespuesta1(respuesta: boolean) {
        return this.#respuesta1 = respuesta;
    }
    setRespuesta2(respuesta: boolean) {
        return this.#respuesta2 = respuesta;
    }
}