import { Prisionero } from '../Prototipos/Prisionero';

// Andres Puerta Cedula : 31212728
// Estrategia: Cooperador de Larga Tolerancia.
// Coopera por defecto y tolera los engaños del rival.
// Si el cómplice lo traiciona 3 veces en total, activa la bandera y confiesa en la siguiente ronda

/**
    estrategia: 7puntos 
    La estrategia es valida pero se implementa de una forma que no es la que se explica
    Estas trabajando de forma global mientra que explicas que es un castigo a una persona concreta
    codigo:     8puntos
    bonos:      1puntos
    Reglas:    -3puntos
 */
export class AndresPuerta extends Prisionero {
    nota = 13;
    /* Reglas de la clase para variables -1 */
    private bandera: boolean = false;
    /* Reglas de la clase para variables -2 */
    private contador: number = 0;

    constructor() {
        super();
        this.nombre = 'Andres Puerta ';
    }

    override confesar(): boolean {
        const historial = this.historial;
        const n = historial.length;

        // Si es la primera ronda, coopero por defecto
        if (n === 0) return false;

        // Si veníamos de confesar en la ronda anterior (defensa activa), nos calmamos
        if (this.bandera === true) {
            this.bandera = false;
        }

        // Revisamos si el rival nos traicionó en el último turno
        /* Reglas de la clase para variables -3 */
        const ultimaJugadaRival = historial[n - 1];
        if (ultimaJugadaRival === true) {
            this.contador++;
        }

        // Condicion: Al acumular exactamente 3 traiciones, se activa la bandera de ataque
        if (this.contador >= 3) {
            this.bandera = true;
            this.contador = 0; // Desbloqueo: Reiniciamos el contador para la próxima evaluación
        }

        return this.bandera;
    }
}
