import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";
// NOMBRE: DANNALY FREITE
// CÉDULA: 16088113
// ESTRATEGIA: "Analista de Tendencia Reciente". Compara la agresividad del oponente 
// en las últimas 5 rondas contra las 5 rondas anteriores. Si detecta un incremento 
// en las traiciones, responde traicionando para protegerse de una posible explotación.
export class DannalyFreite extends Prisionero {
    nota = 20;
    constructor() {
        super();
        this.nombre = 'Dannaly Freite Est2';
    }

    confesar(_i: Interrogador): boolean {
        const historialOponente = this.historial;

        if (historialOponente.length < 10) return false;

        const recientes = historialOponente.slice(-5).filter(d => d === true).length;
        const anteriores = historialOponente.slice(-10, -5).filter(d => d === true).length;

        return recientes > anteriores;
    }
}
