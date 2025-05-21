import { Prisionero } from "../Prototipos/Prisionero";
import { InterrogadorInterface, PrisioneroInterface } from "../Prototipos/interface";
// Estrategia HellyRamirez:
// - Coopera la primera vez.
// - Si el cómplice alterna entre traicionar y cooperar en las últimas 4 rondas
// (es decir, nunca repite la misma acción dos veces seguidas),
// HellyRamirez traiciona para castigar la indecisión.
// - Si el cómplice coopera 2 veces seguidas después de una traición,
// HellyRamirez coopera para premiar el cambio positivo.
// - Si el cómplice traiciona 3 veces seguidas, HellyRamirez traiciona 2 veces seguidas
// y luego vuelve a observar.
// - Por defecto, HellyRamirez coopera, buscando fomentar la cooperación pero castigando
// la indecisión y la traición excesiva.
// CI: 31759361
export class HellyRamirez extends Prisionero {
    private castigoActivo = 0;
    constructor() {
        super();
        this.setNombre("Helly Ramirez");
    }

    confesar(_i: InterrogadorInterface | PrisioneroInterface): boolean {
        const complice = this.getComplice();
        if (!complice) return false;
        const historial = this.getHistorial(complice.getNombre());
        if (historial.length === 0) return false; // Coopera la primera vez

        // Si está en modo castigo por traición excesiva
        if (this.castigoActivo > 0) {
            this.castigoActivo--;
            return true; // Traiciona durante el castigo
        }

        // Castiga indecisión: alternancia en las últimas 4 rondas
        if (historial.length >= 4) {
            let alterna = true;
            for (let i = historial.length - 1; i > historial.length - 4; i--) {
                if (historial[i] === historial[i - 1]) {
                    alterna = false;
                    break;
                }
            }
            if (alterna) {
                return true; // Castiga la indecisión
            }
        }

        // Premia cambio positivo y castiga traición excesiva si hay al menos 3 rondas
        if (historial.length >= 3) {
            // Premia cambio positivo: 2 cooperaciones seguidas después de una traición
            if (historial[historial.length - 3] && !historial[historial.length - 2] && !historial[historial.length - 1]) {
                return false; // Premia el cambio positivo
            }
            // Castiga traición excesiva: 3 traiciones seguidas
            if (historial[historial.length - 1] && historial[historial.length - 2] && historial[historial.length - 3]) {
                this.castigoActivo = 1; // Traiciona 2 veces seguidas
                return true;
            }
        }

        // Por defecto, coopera
        return false;
    }
}