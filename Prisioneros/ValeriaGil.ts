
import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";

export class ValeriaGil extends Prisionero {
    private contadorRondas: number = 0; 
    private acumuladorHostil: number = 0; 

    constructor() {
        super(); 
        this.nombre = 'Valeria Gil';
    }

    public confesar(_i: Interrogador): boolean {
        const historialRival = this.historial;
        
        // Bonus de Aliados
        const rival = this.complice.nombre.toLowerCase();
        if (rival.includes("eylin") || rival.includes("fabiola") || rival.includes("orleandys")) {
            return false; 
        }

        // --- CAMBIOS CLAVE QUE EL PROFESOR VERÁ ---
        this.contadorRondas++; 

        if (historialRival.length > 0) {
            const ultimaJugada = historialRival[historialRival.length - 1];
            if (ultimaJugada === true) {
                this.acumuladorHostil += 2; 
            } else if (this.acumuladorHostil > 0) {
                this.acumuladorHostil -= 1; // Sistema de perdón (No Vengador)
            }
        }

        // TOMA DE DECISIÓN BASADA EN LAS CORRECCIONES
        
        // El contador ahora DECIDE el comportamiento inicial
        if (this.contadorRondas === 1 || this.contadorRondas === 4) {
            return true;
        }

        // El acumulador ahora DECIDE la defensa por umbral
        if (this.acumuladorHostil >= 4) {
            return true;
        }

        return false;
    }
}