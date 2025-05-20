import { Prisionero } from "../Prototipos/Prisionero";

// Esta estrategia conocida como "Pavlov" o "Gana-Quédate, Pierde-Cambia". En esencia, simula cómo un prisionero decide si confesar (traicionar) o cooperar (llamar) con su cómplice en una serie de interacciones repetidas.
// La lógica principal de este Prisionero se encuentra en el método confesar():
// Primera Interacción: // Si es la primera vez que este Prisionero interactúa con un cómplice específico, siempre coopera (no confiesa). Es un inicio amistoso para ver cómo reacciona el otro. 
// Interacciones Posteriores (Gana-Quédate, Pierde-Cambia):
// Para las rondas siguientes, el Prisionero evalúa el resultado de la ronda anterior: 
// Si el resultado de la ronda anterior fue "favorable" para él, entonces repite la misma decisión que tomó en esa ronda. Esto es el "Gana-Quédate". 
// // Si el resultado de la ronda anterior fue "desfavorable" para él, entonces cambia su decisión respecto a la ronda anterior. Si antes cooperó, ahora traiciona; Si antes traicionó, ahora coopera. Esto es el "Pierde-Cambia".

// SALOMON PARRA 31118236
export class SalomonParra extends Prisionero {
    constructor() {
        super();
        this.setNombre('Salomon Parra');
    }

    confesar(): boolean {
        const historialConEsteComplice = this.getHistorial(this.getComplice().getNombre());
        const historialComplice = this.getComplice().getHistorial(this.getNombre());
        
        // Si es la primera interacción, coopera (no confiesa)
        if (historialConEsteComplice.length === 0) {
            return false;
        }

        const ultimaDecisionPropia = this.obtenerUltimaDecision(historialConEsteComplice);
        const ultimaDecisionComplice = this.obtenerUltimaDecision(historialComplice);
        
        // Evalúa si el resultado fue favorable
        const fueFavorable = this.evaluarResultado(ultimaDecisionPropia, ultimaDecisionComplice);
        
        // Win-Stay, Lose-Shift
        return fueFavorable ? ultimaDecisionPropia : !ultimaDecisionPropia;
    }

    private obtenerUltimaDecision(historial: any[]): boolean {
        // Asume que el historial guarda booleanos (false = cooperar, true = traicionar)
        return historial.length > 0 ? historial[historial.length - 1] : false;
    }

    private evaluarResultado(decisionPropia: boolean, decisionComplice: boolean): boolean {
        // Lógica de evaluación basada en la matriz de pagos del dilema del prisionero
        if (!decisionPropia && !decisionComplice) { // Ambos cooperan
            return true; // Resultado favorable (3 años)
        } else if (decisionPropia && decisionComplice) { // Ambos traicionan
            return false; // Resultado desfavorable (5 años)
        } else if (decisionPropia && !decisionComplice) { // Tú traicionas, él coopera
            return true; // Resultado muy favorable (0 años)
        } else { // Tú cooperas, él traiciona
            return false; // Resultado muy desfavorable (10 años)
        }
    }
}