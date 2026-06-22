import { Prisionero } from '../Prototipos/Prisionero';

//Este prisionero tiene ciertas reglas para cooperar

// En la primera ronda siempre coopera
// Si el Complice es un amigo de la lista de amigos, siempre coopera
// apartir de la segunda ronda ve el historial del Complice y coopera Si y Solo Si
// el Complice Coopero y el numero de la ronda es Par y Si el Complice traiciona
// y el numero de la ronda es impar
// en los demas casos Traicionara

// Mauricio Peña C.I:33.447.836
/**
    Estrategia: 10puntos
    Codigo:     10puntos
    Reglas:    -5puntos
 */
/** MauricioPeña-5.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1 */
export class MauricioPeña extends Prisionero {
    nota = 15;
    #lista_amigos = ['Cristian Sierralta', 'Diego Oropeza'];

    constructor() {
        super();
        this.nombre = 'Mauricio Peña';
    }

    confesar(): boolean {
        const nombre_complice = this.complice.nombre;
        const historial_complice = this.historial || [];
        const ronda_actual = historial_complice.length + 1;

        // Condición especial para la primera ronda
        if (ronda_actual === 1) {
            return true; // En la primera ronda, siempre COOPERA
        }

        // Verificar si el cómplice es un amigo de la lista
        if (this.#lista_amigos.includes(nombre_complice)) {
            return true; // COOPERA (no confiesa)
        }

        // A partir de la segunda ronda, evaluamos el historial
        const hay_historial = historial_complice.length > 0; // Esto siempre será true si rondaActual > 1
        /* Reglas de la clase para variables -2 */
        const compliceCooperoUltimaRonda = hay_historial && historial_complice[historial_complice.length - 1] === false; // false = cooperar
        /* Reglas de la clase para variables -3 */
        const compliceTraicionoUltimaRonda =
            hay_historial && historial_complice[historial_complice.length - 1] === true; // true = traicionar

        // Condición 1 para COOPERAR (a partir de la ronda 2): Cómplice cooperó última ronda Y ronda actual es par
        /* Reglas de la clase para variables -4 */
        const condicionCoopera1 = compliceCooperoUltimaRonda && ronda_actual % 2 === 0;

        // Condición 2 para COOPERAR (a partir de la ronda 2): Cómplice traicionó última ronda Y ronda actual es impar
        /* Reglas de la clase para variables -5 */
        const condicionCoopera2 = compliceTraicionoUltimaRonda && ronda_actual % 2 !== 0;

        // Si se cumple alguna de las condiciones para cooperar, coopera
        if (condicionCoopera1 || condicionCoopera2) {
            return true; // COOPERA (no confiesa)
        } else {
            return false; // TRAICIONA (confiesa)
        }
    }
}
