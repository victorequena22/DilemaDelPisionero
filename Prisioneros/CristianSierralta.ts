import { Prisionero } from '../Prototipos/Prisionero';

// Nombre: Cristian Sierralta
// Cedula: 32014233
// Estrategia: Si "todos" está en enemigos, traiciona a cualquiera que no sea amigo.
/**
    La estrategia actua por defecto como traidor
    Estrategia: 0puntos
    Código:     0puntos
    Bonos:      1puntos
    Reglas:    -7puntos
 */
/** Cristiansierralt.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1 */
export class CristianSierralta extends Prisionero {
    nota = -6;
    // Lista de amigos: Siempre coopera con ellos
    /* Reglas de la clase para variables -2 */
    #listaAmigos = ['Mauricio Peña', 'Diego Oropeza '];

    // Lista de enemigos: Si incluyes "todos", marcará a todos los demás como enemigos
    /* Reglas de la clase para variables -3 */
    #listaEnemigos = ['todos', 'Fabrizio Morales', 'Daniel Melendez'];

    /* Reglas de la clase para variables -4 */
    #contadorTraiciones = 0;
    /* Reglas de la clase para variables -5 */
    #acumuladorTraiciones = 0;

    constructor() {
        super();
        this.nombre = 'Cristian Sierralta';
    }

    confesar(): boolean {
        /* Reglas de la clase para variables -6 */
        const n = this.complice.nombre;
        const h = this.historial;

        // 1. REGLA DE ORO: Si está en la lista de amigos, COOPERAR (false)
        if (this.#listaAmigos.includes(n)) {
            return false;
        }

        // 2. REGLA HOSTIL: Si "todos" está en la lista, o el nombre está en la lista, TRAICIONAR (true)
        /* Reglas de la clase para variables -7 */
        /** Esto bloquea todo lo que viene despues */
        const modoEnemigoTotal = this.#listaEnemigos.includes('todos');
        if (modoEnemigoTotal || this.#listaEnemigos.includes(n)) {
            return true;
        }

        // 3. SEGUIMIENTO: Registro de traiciones recibidas
        if (h.at(-1)) {
            this.#contadorTraiciones++;
            this.#acumuladorTraiciones += 1;
        }

        // 4. COMPORTAMIENTO BASE: Cooperar por defecto al inicio
        if (h.length < 5) {
            return false;
        }

        return true;
    }
}
