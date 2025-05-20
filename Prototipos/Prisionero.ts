import { InterrogadorInterface, PrisioneroInterface } from "./interface";
import { Persona } from "./Persona";

export class Prisionero extends Persona implements PrisioneroInterface {
    #sentencia: number = 0;
    #complice: PrisioneroInterface;
    #interrogador: InterrogadorInterface;
    //get
    getSentencia() { return this.#sentencia; }
    getComplice() { return this.#complice; }
    //set
    setSentencia(sentencia: number) { this.#sentencia = sentencia; }
    setComplice(complice: PrisioneroInterface) { this.#complice = complice; }
    setInterrogador(interrogador: InterrogadorInterface) { this.#interrogador = interrogador; }
    //metodos 
    confesar(_i: InterrogadorInterface | PrisioneroInterface) { return false; }
    juicio(condena: number) {
        if (this.#interrogador.getPrisionero1().getNombre() !== this.getNombre()) {
            this.getHistorial(this.#complice.getNombre()).push(this.#interrogador.getRespuesta1());
        } else {
            this.getHistorial(this.#complice.getNombre()).push(this.#interrogador.getRespuesta2());
        }
        this.#sentencia += condena;
    }
}