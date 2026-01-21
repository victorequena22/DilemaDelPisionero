import { Prisionero } from "../Prototipos/Prisionero";

// NOMBRE: Veronica Paola Rivas Torrealba
// CEDULA: 32.077.315
// ESTRATEGIA: "Analista de Tendencias Estricto"
// Inicia con una fase de confianza de 2 turnos para establecer cooperación.
// Utiliza un acumulador para registrar las traiciones del cómplice.
// Calcula la tendencia de traición: si el cómplice confiesa 4 o más veces 
// en los últimos 10 encuentros, el algoritmo activa un modo defensivo permanente 
// para minimizar los años de condena.

export class VeronicaRivas extends Prisionero {

    nota = 0;
    // No cumple con las reglas de las guias
    // contadorEncuentros se usa.
    // cuando entra en modoDefensivo no existe forma de cambiar lo que lo hace que actue como honesto

    // Bandera: modo defensivo permanente activado
    #modoDefensivo: boolean = false;
    
    #contadorEncuentros: number = 0;

    #acumuladorTraiciones: number = 0;
    
    constructor() {
        super();
        this.nombre = 'Veronica Rivas';
    }

    confesar(): boolean {
        
        const h = this.historial;
        this.#contadorEncuentros++;
        
        if (h.length < 2) {
            return false;
        }
        
        if (h.at(-1)) {
            this.#acumuladorTraiciones++;
        }
    
        if (this.#modoDefensivo) {
            return true;
        }
        
        const ventanaAnalisis = h.length >= 10 ? 10 : h.length;
        const ultimosEncuentros = h.slice(-ventanaAnalisis);
        
        const traicionesEnVentana = ultimosEncuentros.filter(t => t).length;
    
        if (traicionesEnVentana >= 4) {
            this.#modoDefensivo = true;
            return true;
        }

        return false;
    }
    
    get modoDefensivo(): boolean {
        return this.#modoDefensivo;
    }
    
    get contadorEncuentros(): number {
        return this.#contadorEncuentros;
    }
    
    get acumuladorTraiciones(): number {
        return this.#acumuladorTraiciones;
    }
}