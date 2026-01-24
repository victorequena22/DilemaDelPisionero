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

export class VeronicaRivas extends Prisionero {  
    nota = 15;
    //No sigue las teglas de la guia 
    #puntosAcumulados: number = 0;  
    #promedioAgresividad = 0; 
    #alertaAgresion: boolean = false; 

    #agresivos = ['Daniela Brito', 'Luis Gallardo']; 
    #cooperadores = ['Jesus Cruz', 'Maria Andrade'];

    constructor() {
        super();
        this.nombre = 'Veronica Rivas'; 
    }

    confesar(): boolean {
        
        const n = this.complice.nombre;
        const h = this.historial;
         
        var traicionesRival = 0;
        for (const accion of h) {
            if (accion === true) traicionesRival++;
        }
        
        if (h.length > 0) {
            const ultima = h[h.length - 1];
            if (ultima === false) this.#puntosAcumulados += 3;
        }
        //Calculo del promedio 
        this.#promedioAgresividad = h.length > 0 ? traicionesRival / h.length : 0;

       //Bandera 
        this.#alertaAgresion = traicionesRival > (h.length - traicionesRival);

       //Logica de identificacion (Turno inicial)
        if (h.length === 0) {
            if (this.#agresivos.includes(n)) return false; 
            if (this.#cooperadores.includes(n)) return true; 
            return false; 
        }

       //Logica de decision
        const ultimaAccionRival = h[h.length - 1];
        if (this.#alertaAgresion && this.#promedioAgresividad > 0 && ultimaAccionRival === true) {
            return true; 
        }
       //Logica de inversion (Espejo inverso)
        return ultimaAccionRival === false; 
    }

    get conteoTraiciones() { 
        return this.historial.filter(a => a === true).length; 
    }

    get puntosAcumulados() {
        return this.#puntosAcumulados;
    }

    get promedioAgresividad() {
         return this.#promedioAgresividad;
   }

    get alertaAgresion() {
        return this.#alertaAgresion;
    }
}