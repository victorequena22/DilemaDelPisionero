import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador"; 

//Prisionero: Carlos Pérez
//Cedula: 31.152.112

//ESTRATEGIA: Comienza cooperando, luego adapta
//1. Primera ronda: NO confesar (cooperar)
//2. Si el oponente casi siempre coopera: seguir cooperando
//3. Si el oponente traiciona mucho: comenzar a confesar

export class CarlosPerez extends Prisionero {
    nota = 0;
    // No se permiten porcentajes directos
    // No cumple con las reglas de las guias
    // rondas no hace nada en la toma de deciciones
    // modo_defensivo no hace nada en la toma de deciciones
    // interrogador y no es usado
    // Albany Jimenez ya responde con la ultima respuesta del historial local

    // Contador de rondas
    private rondas: number = 0;
    
    // Bandera: estamos en modo defensivo?
    private modo_defensivo: boolean = false;
    
    constructor() {
        super();
        this.nombre = 'Carlos Pérez';
    }

    confesar(interrogador: Interrogador): boolean {
        this.rondas++;
        
        // PRIMERA RONDA: Cooperar siempre
        if (this.rondas === 1) {
            return false;
        }
        
        if (this.historial.length === 0) {
            // No hay historial aún, cooperar
            return false;
        }
        
        // Obtener la última acción del oponente
        const ultima_accion_oponente = this.historial[this.historial.length - 1];
        
        if (ultima_accion_oponente) {
            // El oponente confesó la última vez
            this.modo_defensivo = true;
            return true;
        } else {
            // El oponente cooperó la última vez
            this.modo_defensivo = false;
            return false;
        }
    }
}