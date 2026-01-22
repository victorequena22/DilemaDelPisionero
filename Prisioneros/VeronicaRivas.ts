import { Prisionero } from "../Prototipos/Prisionero";
// Nombre: Veronica Paola Rivas Torrealba
// Cedula: 32.077.315
// Estrategia: Desconfianza Progresiva con Redención Difícil.
//  Inicia confesando por desconfianza natural. Usa un sistema de puntos
//  de confianza que se gana cooperando y se pierde traicionando. Si acumula muchas traiciones
//  entra en modo vigilancia extrema. Puede perdonar solo si el oponente demuestra cooperación
//  sostenida (minimo 5 jugadas seguidas cooperando). Detecta patrones sospechosos de alternancia.
//  Los aliados tienen confianza infinita, los enemigos nunca tienen oportunidad.
export class VeronicaRivas extends Prisionero {
    nota = 0;
    // en espera de que el juez me pida la nota
    #listaAliados: string[] = ["Maria Andrade", "Daniela Brito"];
    #listaEnemigos: string[] = ["Luis Gallardo"];
    #contadorTraiciones: number = 0;
    #registroOponentes: Map<string, {
        puntosConfianza: number;
        encuentros: number;
        ultimasJugadas: boolean[];
    }> = new Map();
    
    constructor() {
        super();
        this.nombre = "Veronica Rivas";
    }
    
    confesar(): boolean {
        const oponente: string = this.complice.nombre;
        const h: boolean[] = this.historial;
        
        if (this.#listaAliados.includes(oponente)) return false;
        if (this.#listaEnemigos.includes(oponente)) return true;
        
        if (!this.#registroOponentes.has(oponente)) {
            this.#registroOponentes.set(oponente, {
                puntosConfianza: 0,
                encuentros: 0,
                ultimasJugadas: []
            });
            
            return true;
        }
        
        const registro = this.#registroOponentes.get(oponente)!;
        
        if (h.length > 0) {
            const ultimaJugada: boolean = h[h.length - 1];
            
            registro.encuentros++;
            registro.ultimasJugadas.push(ultimaJugada);
            
            if (registro.ultimasJugadas.length > 5) {
                registro.ultimasJugadas.shift();
            }
            
           
            if (ultimaJugada === true) {
                registro.puntosConfianza -= 3;
                this.#contadorTraiciones++;
            } else {
                
                registro.puntosConfianza += 1;
            }
        }
        
        // Si he recibido muchas traiciones en total, ser más estricto
        // Nivel bajo: menos de 3 traiciones totales
        // Nivel medio: entre 3 y 7 traiciones
        // Nivel alto: más de 7 traiciones
        const umbralEstricto: number = this.#contadorTraiciones > 7 ? -5 : 
                                       this.#contadorTraiciones > 3 ? -6 : -8;
        

        if (registro.puntosConfianza <= umbralEstricto) {
            
            if (registro.ultimasJugadas.length >= 5) {
                const ultimas5: boolean[] = registro.ultimasJugadas.slice(-5);
                const todasCooperaron: boolean = ultimas5.every((j: boolean) => j === false);
                if (todasCooperaron) {
                    registro.puntosConfianza = 0;
                    return false;
                }
            }
            
            return true;
        }
        
        if (registro.ultimasJugadas.length >= 4) {
            const ultimas4: boolean[] = registro.ultimasJugadas.slice(-4);
            let cambios: number = 0;
            for (let i = 0; i < ultimas4.length - 1; i++) {
                if (ultimas4[i] !== ultimas4[i + 1]) cambios++;
            }
          
            if (cambios >= 3) {
                registro.puntosConfianza -= 2; 
                return true;
            }
        }
        
        if (registro.puntosConfianza > 2) return false;
        
        
        if (registro.puntosConfianza >= -2) {
            
            if (h.length > 0) {
                const ultima: boolean = h[h.length - 1];
                return ultima; 
            }
        }
        
        
        return true;
    }
    

    get listaAliados(): string[] {
        return this.#listaAliados;
    }
    
    get listaEnemigos(): string[] {
        return this.#listaEnemigos;
    }
    
    get totalTraiciones(): number {
        return this.#contadorTraiciones;
    }
    
    get nivelDesconfianzaGeneral(): string {
        if (this.#contadorTraiciones > 7) return "ALTO";
        if (this.#contadorTraiciones > 3) return "MEDIO";
        return "BAJO";
    }
    
    get estadisticasDetalladas(): { [key: string]: any } {
        const resultado: { [key: string]: any } = {};
        this.#registroOponentes.forEach((valor, clave) => {
            resultado[clave] = {
                puntosConfianza: valor.puntosConfianza,
                encuentros: valor.encuentros,
                ultimasJugadas: [...valor.ultimasJugadas]
            };
        });
        return resultado;
    }
}