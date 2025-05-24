import { Prisionero } from "../Prototipos/Prisionero";

// Estrategia: Coopera la primera vez.
//Coopera dos veces si el cómplice coopera.
//Traiciona dos veces si el cómplice traiciona.
//Cada 5 jugadas, el ciclo se reinicia y vuelve a empezar.
// V-30560368
export class RonnyPerez extends Prisionero {
    /***************************************************************/
    /** Se te olvido poner privados los atributos                  */
    /* No se explica correctamente el comportamiento del codigo    */
    /***************************************************************/
    nota = 13;
    private contador: number = 0;
    private modo: "normal" | "cooperando" | "castigando" = "normal";
    private coopRestantes: number = 0;
    private castigoRestante: number = 0;

    constructor() {
        super();
        this.setNombre('Ronny Pérez');
    }

    confesar() {
        const historial = this.getHistorial(this.getComplice().getNombre());

        // Reinicia el contador si llega a 5
        if (this.contador >= 5) {
            this.contador = 0;
            this.modo = "normal";
            this.coopRestantes = 0;
            this.castigoRestante = 0;
        }

        // Primera ronda: coopera
        if (historial.length === 0) {
            this.contador++;
            return false;
        }

        // Si está en modo cooperando, coopera las veces que falten
        if (this.modo === "cooperando" && this.coopRestantes > 0) {
            this.coopRestantes--;
            this.contador++;
            if (this.coopRestantes === 0) this.modo = "normal";
            return false;
        }

        // Si está en modo castigando, traiciona las veces que falten
        if (this.modo === "castigando" && this.castigoRestante > 0) {
            this.castigoRestante--;
            this.contador++;
            if (this.castigoRestante === 0) this.modo = "normal";
            return true;
        }

        // Analiza la última jugada del cómplice
        const ultima = historial[historial.length - 1];

        if (ultima === true) {
            // Si traiciona, suma 2 al contador y castiga 2 veces
            this.contador += 2;
            this.modo = "castigando";
            this.castigoRestante = 1; // Ya va a traicionar esta vez, queda 1 más
            return true;
        } else {
            // Si coopera, coopera dos veces seguidas
            this.modo = "cooperando";
            this.coopRestantes = 1; // Ya coopera esta vez, queda 1 más
            this.contador++;
            return false;
        }
    }
}