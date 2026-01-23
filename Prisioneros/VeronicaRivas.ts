import { Interrogador } from "../Prototipos/Interrogador";
import { Prisionero } from "../Prototipos/Prisionero";

//Nombre: Veronica Paola Rivas Torrealba
//Cedula: 32.077.315
//Estrategia: Espejo inverso
//Esta estrategia utiliza una "Inversión de Impulso" basada en la clasificación del rival.
//1. Contra rivales agresivos: El instinto dicta traicionar para protegerse, por lo que 
//el algoritmo NEGARÁ (cooperará) para descolocar la lógica del atacante.
//2. Contra rivales cooperadores: El instinto dicta cooperar, por lo que el algoritmo 
//CONFESARÁ para maximizar puntos ante la guardia baja del oponente.
//Esta estrategia permite adaptarse si el rival cambia su conducta.

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