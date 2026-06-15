import { Prisionero } from "../Prototipos/Prisionero";
/* Nombre: Cristian Sierralta/Cedula: 32.014.233//  
 @Estrategia:
 * - Coopera incondicionalmente con amigos.
 * - Traiciona incondicionalmente a enemigos.
 * - Para el resto, castiga la traición crónica (≥7 de 10 últimas rondas).Por defecto, coopera.
 */

/**
    Estrategia: 10puntos 
    Código:     10puntos Arregla el codigo para que no rompa el juego
    Bonos:      2puntos
    Reglas:    -6puntos
 */
export class CristianSierralta extends Prisionero {
    nota = 16;
    /* Reglas de la clase para variables -1 */
    #Lista_Amigos: string[] = ["Mauricio Peña", "Diego Oropesa"];
    /* Reglas de la clase para variables -2 */
    #Lista_Enemigos: string[] = ["Fabricio Morales", "Daniel Melendez"];
    /* Reglas de la clase para variables -3 */
    #Contador_Traiciones: number = 0;

    constructor() {
        super();
        this.nombre = "Cristian Sierralta"; 
    }

    confesar(): boolean {
        const n = this.complice.nombre;
        const h = this.historial;
           // 1. Amigos → siempre cooperar
        if (this.#Lista_Amigos.includes(n)) {
            return false;
        }
         // 2. Enemigos → siempre traicionar
        if (this.#Lista_Enemigos.includes(n)) {
             this.#Contador_Traiciones++;
            return true;
        }
       // 3. Castigo por traición crónica: últimas 10 rondas con ≥7 traiciones
        if (h.length < 10) {
            return false;
        }

        const t = h.slice(-10).filter(j => j).length;
        return t >= 7;
    }

    /* Reglas de la clase para las funciones/metodos -4 */
    get Lista_Amigos() {
        return this.#Lista_Amigos;
    }

    /* Reglas de la clase para las funciones/metodos -5 */
    get Lista_Enemigos() {
        return this.#Lista_Enemigos;
    }

    /* Reglas de la clase para las funciones/metodos -6 */
    get Contador_Traiciones() {
        return this.#Contador_Traiciones;
    }
}