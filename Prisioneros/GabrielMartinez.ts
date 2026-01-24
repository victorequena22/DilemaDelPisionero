import { Prisionero } from "../Prototipos/Prisionero";

// Nombre: Gabriel Martinez
// Cédula: 31663178
// Estrategia: "Traición Tardía".
// Uso el contador para establecer una 'Fase de Confianza' inicial (3 turnos) donde Niego (false).
// Luego, activo una bandera de 'Modo Defensa' y Confieso (true) el resto del juego.

export class GabrielMartinez extends Prisionero {
    nota = 5;
    // Mas del 95% de las respuestas son iguales a honesto
    // No sigue las reglas de la guia
    private modoDefensaActivado: boolean = false;
    private contadorRondas: number = 0;
    private acumuladorTension: number = 0;

    constructor() {
        super();
        this.nombre = 'Gabriel Martinez';
    }

    confesar(): boolean {
        
        this.contadorRondas += 1;

        this.acumuladorTension += 10; 

        if (this.contadorRondas <= 2) {
            return false; 
        }

        if (this.modoDefensaActivado == false) {
            this.modoDefensaActivado = true;
        }

        return true;
    }
}