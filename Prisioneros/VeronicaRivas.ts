import { Prisionero } from "../Prototipos/Prisionero";

// NOMBRE: Veronica Paola Rivas Torrealba
// CEDULA: 32.077.315
// ESTRATEGIA: "Analista de Tendencias Estricto"
// Inicia con una fase de confianza de 2 turnos para establecer cooperación,
//  Utiliza un acumulador para registrar las traiciones del cómplice y calcula la tendencia de traición:
//  si el cómplice confiesa en un 40% o más de los encuentros, el algoritmo activa un modo defensivo permanente para minimizar los años de condena.
export class VeronicaRivas extends Prisionero {
    nota = 0;
    // No se permiten porcentajes directos
    // No cumple con las reglas de las guias
    // totalEncuentros no tiene uso mas que llevar una cuenta
    // Llevas un contador global(traicionesRecibidas) y lo comparas con una variable local(this.historial) usa el interrogador para llevar correctamente la cuenta
    private totalEncuentros: number = 0;
    private traicionesRecibidas: number = 0;
    constructor() {
        super();
        this.nombre = 'Veronica Rivas';
    }
     confesar(): boolean {
        this.totalEncuentros++;
        const historial = this.historial;

        if (!historial || historial.length < 2) {
            return false;
        }

        if (historial[historial.length - 1] === true) {
            this.traicionesRecibidas++;
        }

        if (this.traicionesRecibidas >= (historial.length * 0.4)) {
            return true;
        }

        return false;
    }
}