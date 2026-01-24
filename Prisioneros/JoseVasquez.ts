import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

/**
 * Alumno: Jose Vasquez
 * Cedula: V30125480
 * * MI ESTRATEGIA: "Confianza con Memoria"
 * Mi prisionero no quiere traicionar de buenas a primeras, pero tampoco es tonto. 
 * Esta es la logica que sigue:
 * * 1. MEMORIA DEL JUEGO: Uso variables que guardan informacion durante todo el proceso. 
 * Asi mi prisionero "recuerda" si lo trataron bien o mal en el pasado.
 * * 2. SEGUNDA OPORTUNIDAD: Si el complice me traiciona una sola vez, lo dejo pasar 
 * para intentar que ambos salgamos beneficiados. Pero si me traiciona una segunda 
 * vez (Contador > 1), entiendo que no es de fiar y empiezo a confesar yo también 
 * para protegerme de los 10 años de cárcel.
 * * 3. ALERTA: Uso una "Bandera" que se prende apenas me traicionan. Si esa bandera 
 * esta prendida y ya llevamos varias rondas jugando, prefiero asegurar mi libertad 
 * o una condena bajita confesando.
 * * 4. REGISTRO DE PUNTOS: Con el "Acumulador" voy viendo cuántos años de cárcel 
 * me va poniendo el juez, para saber si mi plan esta funcionando.
 */

export class JoseVasquez extends Prisionero {
    nota  = 6;
    // Mas del 95% de las respuestas son iguales a honesto
    // No sigue las reglas de la guia
    #banderaTraicionado: boolean = false;
    #contadorTraiciones: number = 0;
    #acumuladorSentencias: number = 0;

    constructor() {
        super();
        this.nombre = "Jose Vasquez";
    }

    confesar(_i: Interrogador | any): boolean {
        const historial = this.historial;
        const totalRondas = historial.length;

        this.#contadorTraiciones = historial.filter(r => r === true).length;

        if (this.#contadorTraiciones > 0) {
            this.#banderaTraicionado = true;
        }

        this.#acumuladorSentencias = this.sentencia;


        if (totalRondas === 0) return false;

        if (this.#contadorTraiciones > 1) return true;

        if (this.#acumuladorSentencias > 30) return true;

        if (this.#banderaTraicionado && totalRondas > 10) return true;

        return false;
    }
}