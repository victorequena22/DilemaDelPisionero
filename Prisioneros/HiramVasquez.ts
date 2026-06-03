import { Prisionero } from "../Prototipos/Prisionero";
// Hiram David Vasquez Yepez 
// CI: V-31.204.329
// EXPLICACIÓN DE LA ESTRATEGIA:
// Si el rival es un pana de la lista, coopera siempre para asegurar el trabajo en equipo.
// Con desconocidos, copia la ultima jugada, y usa un acumulador para contar las traiciones.
// Si el rival lo traiciona más de 3 veces, se activa la bandera  y el prisionero confiesa 
// en todas las rondas siguientes para defenderse de los tramposos.
/**
    Recordar que si tenes una estrategia de venganza debe tener una de perdon
    La estrategia no concuerda del todo con la implementada en el codigo 
        ya que el contador es global y la descripcion es local
    Estrategia: 5ptos
    Codigo:     2ptos
    Bonos:      2ptos
    Reglas:    -2ptos
 */
export class HiramVasquez extends Prisionero {
    nota = 7;
    #acumulador_Traiciones: number;
    #bandera: boolean;
    #lista_Panas: string[];

    constructor() {
        super();
        this.nombre = 'Hiram Vásquez'; 
        this.#acumulador_Traiciones = 0;
        this.#bandera = false;
        this.#lista_Panas = ["Wladimir Rivas", "Jesus Gonzalez"]; 
    }

    confesar(): boolean {
        var historial = this.historial;
        /** Las Reglas de la clase para variables -1 */
        var totalRondas = historial.length; // Contador
       
        // Si es un pana de la lista, nunca lo delatamos
        if (this.#lista_Panas.includes(this.complice.nombre)) {
            return false;
        }
        // Si ya se activó la bandera, confiesa directo sin pensar
        if (this.#bandera === true) {
            return true;
        }
        // Revisamos la última ronda para usar el acumulador
        if (totalRondas > 0) {
            /** Las Reglas de la clase para variables -2 */
            var ultimaJugada = historial[totalRondas - 1];
            
            if (ultimaJugada === true) {
                this.#acumulador_Traiciones = this.#acumulador_Traiciones + 1; // Acumulador
            }
        }
        // Si el acumulador pasa de 3, activamos la bandera 
        if (this.#acumulador_Traiciones > 3) {
            this.#bandera = true; 
            return true;
        }
        // copia la ultima jugada, hacemos lo mismo que el otro hizo antes
        if (totalRondas > 0) {
            return historial[totalRondas - 1];
        }

        return false; 
    }
}