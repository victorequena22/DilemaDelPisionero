import { Prisionero } from "../Prototipos/Prisionero";

/**
 * ESTUDIANTE: Fabiola Sanchez
 * CEDULA: 32.599.781
 * ESTRATEGIA: "Protección Juvenil de Elienny"
 * Explicación: Prisionero de 15 años. Alianza fija con Elienny.
 
 */
export class FabiolaSanchez extends Prisionero {
    // Miembros privados con # (POO Moderna)
#edad: number = 15; 
    #aliadaFija: string = "Elienny";
    #medidorConfianza: number = 100; // BANDERA
    #contadorTraiciones: number = 0; // CONTADOR
    #aniosAcumulados: number = 0;    // ACUMULADOR
    #ultimaSentencia: number = 0;

    constructor() {
        super();
        this.nombre = "Fabiola Sanchez";
    }

    // Propiedad pública para que el juez vea tus años acumulados
    public get sentencia(): number { return super.sentencia; }

    public override confesar(): boolean {
        const nombreOponente = this.complice.nombre;

        // Trabajo en equipo (Aliada Elienny)
        if (nombreOponente.includes(this.#aliadaFija)) {
            return false; 
        }

        // Lógica de Bandera (Basada en confianza)
        if (this.#medidorConfianza < 50) {
            return true; // Se defiende si hay desconfianza
        }

        return false; 
    }

    public recordar(oponenteConfeso?: boolean): void {
        // Evita errores si el simulador no pasa el valor
        if (oponenteConfeso === undefined) return;

        if (oponenteConfeso) {
            this.#contadorTraiciones++; // Actualiza el CONTADOR
            this.#medidorConfianza -= 35; // Baja la BANDERA
        } else {
            if (this.#medidorConfianza < 100) this.#medidorConfianza += 10;
        }

        // Lógica del ACUMULADOR
        const condenaRonda = this.sentencia - this.#ultimaSentencia;
        if (condenaRonda > 0) {
            this.#aniosAcumulados += condenaRonda;
        }
        this.#ultimaSentencia = this.sentencia;
    }

    public override juicio(condena: number): void {
        super.juicio(condena);
        
        // Detectar traición según las reglas  (3 y 10 años)
        const oponenteTraiciono = (condena === 3 || condena === 10);
        
        // Ejecución obligatoria de la memoria
        this.recordar(oponenteTraiciono);
    }
}