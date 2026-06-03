import { Prisionero } from "../Prototipos/Prisionero";
import { InterrogadorInterface, PrisioneroInterface } from "../Prototipos/interface";

// Prisionero Estratega Adaptativo con Memoria Histórica
// Coopera en la primera ronda para establecer confianza.
// Si el cómplice traicionó en la ronda anterior, se toma venganza directa traicionando en la ronda actual.
// Si el cómplice ha cooperado más veces que traicionado, coopera. Si ha traicionado más veces, traiciona.
// Si hay empate, copia la última jugada del cómplice. Busca minimizar su condena adaptándose al rival
// El objetivo es maximizar el beneficio mutuo con rivales honestos y minimizar la condena adaptándose firmemente a rivales hostiles.

// CI: 3143546
export class KelvinPacheco extends Prisionero {
    constructor() {
        super();
        this.setNombre("Kelvin Pacheco");
    }

    confesar(_i: InterrogadorInterface | PrisioneroInterface): boolean {
        const complice = this.getComplice();
        if (!complice) return false;

        const historial = this.getHistorial(complice.getNombre());
        const totalRondas = historial.length;

        // 1. Condición inicial: Coopera la primera vez
        if (totalRondas === 0) return false; 

        // 2. Venganza inmediata: Si traicionó en la ronda anterior, se le devuelve la traición
        const ultimaJugada = historial[totalRondas - 1];
        if (ultimaJugada) return true; 

        // 3. Análisis histórico (Solo se ejecuta si la última jugada fue Cooperar [false])
        // Contamos las traiciones (valores true)
        const traiciones = historial.filter(x => x).length;
        const cooperaciones = totalRondas - traiciones; // Nos ahorramos un .filter()

        // Si hay más traiciones históricas, traiciona
        if (traiciones > cooperaciones) return true;
        
        // Si hay más cooperaciones o hay empate, coopera.
        // (Como explicamos antes, si hay empate, la última jugada fue 'false', así que devuelve false)
        return false; 
    }
}
