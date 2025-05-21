import { Prisionero } from "../Prototipos/Prisionero";

// Tit For Tat con Perdón Condicional
// Esta prisionera sigue la estrategia "Tit For Tat" (ojo por ojo): coopera siempre hasta que el cómplice traicione.
// Si el cómplice traiciona, entra en modo castigo y solo perdona si el cómplice coopera dos veces seguidas.
// Esto permite romper ciclos de venganza y fomentar la cooperación a largo plazo, ya que el cómplice puede notar que, aunque traicione, puede ser perdonado si demuestra un cambio consistente en su comportamiento.
// Si el cómplice coopera, ella siempre coopera.
// Esta estrategia busca equilibrar la reciprocidad con la posibilidad de reconciliación, diferenciándose de un Tit For Tat puro y de cualquier otro prisionero del conjunto.
// CI:32314946

export class SaraVasquez extends Prisionero {
    private enCastigo: Record<string, boolean> = {};
    private cooperacionesDespuesDeTraicion: Record<string, number> = {};

    constructor() {
        super();
        this.setNombre('Sara Vasquez');
    }

    confesar(): boolean {
        const complice = this.getComplice();
        if (!complice) return false;
        const nombre = complice.getNombre();
        const historial = this.getHistorial(nombre);
        if (historial.length === 0) {
            this.enCastigo[nombre] = false;
            this.cooperacionesDespuesDeTraicion[nombre] = 0;
            return false; // Coopera la primera vez
        }

        // Si está en castigo, cuenta cooperaciones del cómplice
        if (this.enCastigo[nombre]) {
            if (!historial[historial.length - 1]) {
                // El cómplice cooperó
                this.cooperacionesDespuesDeTraicion[nombre] = (this.cooperacionesDespuesDeTraicion[nombre] || 0) + 1;
            } else {
                // El cómplice volvió a traicionar, reinicia contador
                this.cooperacionesDespuesDeTraicion[nombre] = 0;
            }
            // Si el cómplice cooperó dos veces seguidas, perdona
            if (this.cooperacionesDespuesDeTraicion[nombre] >= 2) {
                this.enCastigo[nombre] = false;
                this.cooperacionesDespuesDeTraicion[nombre] = 0;
                return false; // Perdona y coopera
            }
            return true; // Sigue castigando
        }

        // Si el cómplice traicionó en la última ronda, entra en castigo
        if (historial[historial.length - 1]) {
            this.enCastigo[nombre] = true;
            this.cooperacionesDespuesDeTraicion[nombre] = 0;
            return true; // Venganza inmediata
        }

        // Si el cómplice cooperó, sigue cooperando
        return false;
    }
}