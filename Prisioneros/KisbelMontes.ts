import { Prisionero } from "../Prototipos/Prisionero";
// Estrategia KisbelMontes:
// - Coopera la primera vez.
// - Si el cómplice ha traicionado 2 veces seguidas en cualquier momento, entra en "modo castigo" y alterna entre traicionar y cooperar.
// - Si el cómplice coopera 3 veces seguidas después de estar en modo castigo, lo perdona y vuelve a cooperar normalmente.
// - Por defecto, alterna entre cooperar y traicionar en cada ronda (esto lo hace impredecible y diferente a Alaina Medina).
//
// Condición de traición: 2 traiciones seguidas del cómplice en cualquier momento.
// Condición de perdón: 3 cooperaciones seguidas del cómplice después de estar en modo castigo.
// Acción por defecto: alternar entre cooperar y traicionar.
// CI: 31371373
export class KisbelMontes extends Prisionero {
    private enCastigo = false;
    private alternar = false;
    private ronda = 0;

    constructor() {
        super();
        this.setNombre("Kisbel Montes");
    }

    confesar(): boolean {
        this.ronda++;
        const complice = this.getComplice();
        if (!complice) return false;
        const historial = this.getHistorial(complice.getNombre());
        if (historial.length === 0) return false; // Coopera la primera vez

        // Condición de traición: 2 traiciones seguidas en cualquier momento
        for (let i = 1; i < historial.length; i++) {
            if (historial[i] && historial[i - 1]) {
                this.enCastigo = true;
                break;
            }
        }

        // Condición de perdón: 3 cooperaciones seguidas después de estar en castigo
        if (this.enCastigo && historial.length >= 3) {
            if (!historial[historial.length-1] && !historial[historial.length-2] && !historial[historial.length-3]) {
                this.enCastigo = false;
                this.alternar = false;
                return false; // Perdona y coopera
            }
        }

        // Si está en castigo, alterna entre traicionar y cooperar
        if (this.enCastigo) {
            this.alternar = !this.alternar;
            return this.alternar;
        }

        // Acción por defecto: alterna entre cooperar y traicionar en cada ronda
        return this.ronda % 2 === 0;
    }
}
