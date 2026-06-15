// Nombre completo: Jesus Gonzalez
// Cedula: 32874451
// Estrategia: "El Metronomo Paranoico"
// Explicacion: Comienza confesando (traicion). Luego mantiene un promedio movil
// de las confesiones del rival en los ultimos 5 turnos. Si el promedio es > 0.5 estrategia 1
// (ha confesado mas del 50%), entonces confiesa para defenderse. Si es <= 0.5,
// niega (coopera). Adicionalmente, si el rival confiesa 3 turnos seguidos, estreategia 2
// activa una bandera de bloqueo que fuerza a confesar durante los siguientes
// 2 turnos (desbloqueo automatico). Esto evita ciclos, no usa porcentajes
// directos (usa promedio calculado), y combina solo 2 estrategias: Estrategia 3
// promedio movil + bloqueo por racha.

import { Prisionero } from "../Prototipos/Prisionero";
/** No se permiten porcentages directos (0.5) */
/** Solo se permiten 2 estrategias maximo */
export class JesusGonzalez extends Prisionero {
    // Contador de turnos (para saber cuantos han pasado)
    private contador_turnos: number;
    
    // Acumulador de confesiones del rival
    private acumulador_confesiones_rival: number;
    
    // Promedio movil calculado
    private promedio_confesiones_rival: number;
    
    // Bandera de bloqueo activa
    private bandera_bloqueo_activa: boolean;
    
    // Contador de cuantos turnos de bloqueo restan
    private contador_bloqueo_restante: number;
    
    // Racha actual de confesiones seguidas del rival
    private racha_confesiones_rival: number;
    
    // Historial de los ultimos 5 turnos del rival (true=confiesa, false=niega)
    private historial_rival: boolean[];

    constructor() {
        super();
        this.nombre = 'Jesus Gonzalez';
        this.contador_turnos = 0;
        this.acumulador_confesiones_rival = 0;
        this.promedio_confesiones_rival = 0;
        this.bandera_bloqueo_activa = false;
        this.contador_bloqueo_restante = 0;
        this.racha_confesiones_rival = 0;
        this.historial_rival = [];
    }

    confesar(): boolean {
        // Si la bandera de bloqueo esta activa, confiesa y reduce el contador
        if (this.bandera_bloqueo_activa) {
            this.contador_bloqueo_restante--;
            if (this.contador_bloqueo_restante <= 0) {
                this.bandera_bloqueo_activa = false;
            }
            return true; // Confiesa durante el bloqueo
        }

        // Primer turno: siempre confiesa (estrategia agresiva inicial)
        if (this.contador_turnos === 0) {
            return true;
        }

        // Para el resto de turnos, usa el promedio movil
        if (this.historial_rival.length === 0) {
            return true; // Si no hay historial, confiesa por seguridad
        }

        // Calcula el promedio real de confesiones del rival
        this.promedio_confesiones_rival = this.acumulador_confesiones_rival / this.historial_rival.length;
        
        // Si el promedio es mayor a 0.5 (confiesa mas del 50%), entonces confiesa
        // Si el promedio es menor o igual a 0.5, niega (coopera)
        return this.promedio_confesiones_rival > 0.5; /** Porcentage */
    }

    // Metodo que el juego llama para informar el resultado de cada ronda
    // El parametro 'resultado' es un objeto que contiene:
    // - confesoYo: boolean
    // - confesoOponente: boolean
    // - puntosYo: number
    // - puntosOponente: number
    actualizar(resultado: { confesoYo: boolean; confesoOponente: boolean; puntosYo: number; puntosOponente: number }): void {
        // Incrementar contador de turnos
        this.contador_turnos++;
        
        // Acumulador: si el oponente confesó en este turno, sumar 1
        if (resultado.confesoOponente) {
            this.acumulador_confesiones_rival++;
            this.racha_confesiones_rival++;
            
            // Verificar si hay 3 confesiones seguidas para activar bloqueo
            if (this.racha_confesiones_rival >= 3 && !this.bandera_bloqueo_activa) {
                this.bandera_bloqueo_activa = true;
                this.contador_bloqueo_restante = 2; // Bloqueo por 2 turnos
            }
        } else {
            this.racha_confesiones_rival = 0;
        }
        
        // Guardar en historial (mantener solo ultimos 5)
        this.historial_rival.push(resultado.confesoOponente);
        if (this.historial_rival.length > 5) {
            const removido = this.historial_rival.shift();
            // Si removemos un true, restamos del acumulador para mantener consistencia
            if (removido) {
                this.acumulador_confesiones_rival--;
            }
        }
        
        // Recalcular promedio despues de actualizar historial
        if (this.historial_rival.length > 0) {
            this.promedio_confesiones_rival = this.acumulador_confesiones_rival / this.historial_rival.length;
        }
    }
}