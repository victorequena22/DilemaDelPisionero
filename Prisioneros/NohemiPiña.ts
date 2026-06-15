import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Nohemi Piña
// Cedula: XX.XXX.XXX
// Estrategia: Coopera al inicio, pero si su cómplice la traiciona dos veces seguidas, responde traicionando en la siguiente ronda.
// Si el cómplice vuelve a cooperar, perdona y vuelve a cooperar.
/**
    Pon las diferencias con la estrategia de Felix Peres
    Estrategia: 5puntos 
    codigo:     10puntos
    Reglas:    -1punto
 */
export class NohemiPiña extends Prisionero {
    nota = 14;
    private rondas: Record<string, number> = {};
    /* Reglas de la clase para variables -1 */
    private traiciones_seguidas: Record<string, number> = {};

    constructor() {
        super();
        this.nombre = 'Nohemi Piña';
    }

    override confesar(): boolean {
        const rival = this.complice.nombre;
        if (!(rival in this.rondas)) {
            this.rondas[rival] = 0;
            this.traiciones_seguidas[rival] = 0;
            return false; // Empieza cooperando
        }

        const ultima_jugada_rival = this.historial[this.historial.length - 1];
        this.rondas[rival]++;

        if (ultima_jugada_rival) {
            this.traiciones_seguidas[rival]++;
        } else {
            this.traiciones_seguidas[rival] = 0;
        }

        // Si el rival traicionó 2 veces seguidas, traiciona, sino, coopera.
        return this.traiciones_seguidas[rival] >= 2;
    }
}
