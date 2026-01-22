import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador"; 

//Prisionero: Carlos Pérez
//Cedula: 31.152.112

//ESTRATEGIA: Comienza cooperando, luego adapta
//1. Primera ronda: NO confesar (cooperar)
//2. Si el oponente casi siempre coopera: seguir cooperando
//3. Si el oponente traiciona mucho: comenzar a confesar

export class CarlosPerez extends Prisionero {
    nota = 10;
    // No explica correctamente la estrategia
    // rondas no hace nada en la toma de deciciones
    // interrogador no es usado
    // No cumple con las reglas de las guias 
    // Contador de rondas
    private rondas: number = 0;
    
    // Bandera: estamos en modo defensivo?
    private modo_defensivo: boolean = false;

    private traiciones_consecutivas : number = 0;

    private rondas_en_defensivo: number = 0; 
    
    constructor() {
        super();
        this.nombre = 'Carlos Pérez';
    }

        confesar(interrogador: Interrogador): boolean {
        this.rondas++;
        
        if (this.rondas === 1) {
            return false;
        }
        
        if (this.historial.length === 0) {
            return false;
        }
        
        const ultima_accion_oponente = this.historial[this.historial.length - 1];
        
        if (ultima_accion_oponente) {
            this.traiciones_consecutivas++;
            this.rondas_en_defensivo = 0; // Reiniciar si hay nueva traición
        } else {
            this.traiciones_consecutivas = 0;
        }
        
        // Activar modo defensivo si hay 3 traiciones seguidas
        if (this.traiciones_consecutivas >= 3) {
            this.modo_defensivo = true;
            this.rondas_en_defensivo = 1;
        }
        
        if (this.modo_defensivo) {
            this.rondas_en_defensivo++;
            
            // Después de 3 rondas en modo defensivo, salir
            if (this.rondas_en_defensivo > 3) {
                this.modo_defensivo = false;
                this.rondas_en_defensivo = 0;
            }
            
            return true;
        }
        
        return ultima_accion_oponente;
    }
}